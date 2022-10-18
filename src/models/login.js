import * as routerRedux from 'connected-react-router';
import { logout, login } from '../services/user';
import { setAuthority } from '../utils/authority';
import { reloadAuthorized } from '../utils/Authorized';
import { parse, stringify } from 'qs';

export default {
  namespace: 'login',

  state: {
    status: undefined,
  },

  effects: {
    *login({ payload }, { call, put }) {
      const response = yield call(login, payload.params);
      yield put({
        type: 'changeLoginStatus',
        payload: { ...response.payload, status: true },
      });
      // Login successfully
      if (response.success === true) {
        const { location } = payload;
        reloadAuthorized();
        const params = location.search.split('?')[1];
        let { redirect } = parse(decodeURIComponent(params));

        yield put(routerRedux.replace(redirect || '/'));
     }
    },

    *logout({ payload }, { call, put }) {
      yield call(logout);
      yield put({
        type: 'changeLoginStatus',
        payload: {
          status: false,
          currentAuthority: 'NULL',
        },
      });
      reloadAuthorized();
      const { location } = payload;
      // redirect
      if (location.pathname !== '/user/login') {
        yield put(
          routerRedux.replace({
            pathname: '/user/login',
            search: stringify({
              redirect: location.pathname,
            }),
          })
        );
      }
    },
  },

  reducers: {
    changeLoginStatus(state, { payload }) {
      // 更新当前权限
      setAuthority(payload.currentAuthority);
      return {
        ...state,
        status: payload.status,
        type: payload.type,
      };
    },
  },
};
