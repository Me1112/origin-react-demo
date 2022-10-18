import memoizeOne from 'memoize-one';
import isEqual from 'lodash/isEqual';
import omitBy from 'lodash/omitBy';
import isUndefined from 'lodash/isUndefined';
import Authorized from '../utils/Authorized';
import { getMenu } from '../services/main';
import staticMenuData from './../config/router.config';

const { check } = Authorized;

const useStatic = false;

/**
 * 根据菜单权限绑定到前端路由配置
 * @name bindAuthorityFromMenuToRoutes
 */
const bindAuthorityFromMenuToRoutes = (menuMap, routes, parentAuthority) => {
  return routes
    .map(route => {
      let menuItem = menuMap[route.key];
      if (!menuItem && !route.routes) return route;
      const authority = (menuItem && menuItem.authority) || parentAuthority;
      const result = omitBy(
        {
          ...route,
          authority,
        },
        isUndefined
      );
      if (route.routes) {
        const children = bindAuthorityFromMenuToRoutes(
          menuMap,
          route.routes,
          authority
        );
        result.routes = children;
      }
      return result;
    })
    .filter(item => item);
};
/**
 * get SubMenu or Item
 */
const getSubMenu = item => {
  // doc: add hideChildrenInMenu
  if (
    item.children &&
    !item.hideChildrenInMenu &&
    item.children.some(child => child.name)
  ) {
    return {
      ...item,
      children: filterMenuData(item.children), // eslint-disable-line
    };
  }
  return item;
};

/**
 * filter menuData
 */
const filterMenuData = menuData => {
  if (!menuData) {
    return [];
  }
  return menuData
    .filter(item => item.name && !item.hideInMenu)
    .map(item => check(item.authority, getSubMenu(item)))
    .filter(item => item);
};
/**
 * 获取菜单map
 * @param {Object} menuData 菜单配置
 */
const getMenuKeyMap = menuData => {
  if (!menuData) {
    return {};
  }
  const menuMap = {};

  const flattenMenuData = data => {
    data.forEach(menuItem => {
      if (menuItem.children) {
        flattenMenuData(menuItem.children);
      }
      // Reduce memory usage
      menuMap[menuItem.key] = menuItem;
    });
  };
  flattenMenuData(menuData);
  return menuMap;
};

const memoizeOneGetMenuKeyMap = memoizeOne(getMenuKeyMap, isEqual);

// 重组router.config为静态菜单
const getStaticMenuChildren = (routes = []) => {
  const children = [];
  const menuPathNameMap = {};
  if (routes.length > 0) {
    routes.forEach((route, i) => {
      children[i] = {
        path: route.path,
        key: route.path,
        name: route.name,
        icon: route.icon,
        children: route.routes || [],
        authority: route.authority,
      };
      menuPathNameMap[route.path] = route.name;
      // if (route.routes && route.routes.length > 0) {
      //   getStaticMenuChildren(route.routes);
      // }
    });
  }
  return { children, menuPathNameMap };
};

// 获取router.config为静态菜单
const getStaticMenuData = (staticMenuData = []) => {
  let menuData = [];
  staticMenuData.forEach((menuItem, i) => {
    if (menuItem.path === '/') {
      menuItem.routes.forEach(route => {
        if (route.isMenu) {
          menuData = getStaticMenuChildren(route.routes);
        }
      });
    }
  });
  return menuData;
};

export default {
  namespace: 'menu',

  state: {
    totalMenuList: [], //原始的所有菜单列表数据
    menuMap: {}, //Map类型的菜单数据
    menuFilterByAuthority: [],
    routerData: [],
    menuData: [],
    menuPathNameMap: {},
  },

  effects: {
    *init({ payload }, { put, call }) {
      const { routes, authority, path } = payload;
      let totalMenuList = [];
      let _menuPathNameMap = {};
      if (useStatic) {
        const res = yield call(getMenu);
        totalMenuList = res.payload;
      } else {
        const { menuPathNameMap, children } = getStaticMenuData(
          staticMenuData || []
        );
        totalMenuList = children;
        _menuPathNameMap = menuPathNameMap;
      }

      const menuMap = memoizeOneGetMenuKeyMap(totalMenuList);
      const routesWidthAuthority = bindAuthorityFromMenuToRoutes(
        menuMap,
        routes
      );
      const menuData = filterMenuData(totalMenuList);

      yield put({
        type: 'save',
        payload: {
          totalMenuList,
          menuPathNameMap: _menuPathNameMap,
          menuMap,
          menuData,
          routerData: routesWidthAuthority,
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  subscriptions: {
    setup({ history }) {
      // Subscribe history(url) change, trigger `load` action if pathname is `/`
      return history.listen(({ pathname, search }) => {
        console.log(`------------history.listen ------------ ${pathname}`);
      });
    },
  },
};
