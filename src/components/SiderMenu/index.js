import React, { useState, useEffect } from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  getFlatMenuKeys,
  getMenuMatchKeys,
  conversionPath,
  urlToList,
} from './menuUtils';
import styles from './index.module.less';
import svgConfig from '../../config/svg.config';
const { SubMenu } = Menu;

//   icon: 'setting',
//   icon: 'http://demo.com/icon.png',
//   icon: <Icon type='setting' />,
const getIcon = icon => {
  if (typeof icon === 'string') {
    if (icon.indexOf('SVG') === 0) {
      return <Icon component={svgConfig[icon]} />;
    }
    return <Icon type={icon} />;
  }

  return icon;
};

const SiderMenu = ({ menu, global, location }) => {
  const { menuData } = menu;
  const { pathname } = location;
  const flatMenuKeys = getFlatMenuKeys(menuData);
  let selectedKeys = getMenuMatchKeys(flatMenuKeys, urlToList(pathname));
  const [openKeys, setOpenKeys] = useState(selectedKeys);

  // 检查是否一级菜单
  const isMainMenu = key =>
    menuData.some(item => key && (item.key === key || item.path === key));
  // 处理菜单open事件
  const handleOpenChange = openKeys => {
    const lastOpenKey = openKeys[openKeys.length - 1];
    const moreThanOne =
      openKeys.filter(openKey => isMainMenu(openKey)).length > 1;
    setOpenKeys(moreThanOne ? [lastOpenKey] : [...openKeys]);
  };

  useEffect(() => {
    setOpenKeys(getMenuMatchKeys(flatMenuKeys, urlToList(pathname)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, menuData]);

  const menuProps = {
    mode: 'inline',
    selectedKeys,
    openKeys,
    onOpenChange: handleOpenChange,
    style: {
      height: 'calc( 100vh - 64px )',
      boxShadow: '5px 0 10px -5px #d8d8d8',
      position: 'relative',
      zIndex: 1,
    },
  };

  /**
   * 判断是否是http链接.返回 Link 或 a
   * Judge whether it is http link.return a or Link
   * @memberof SiderMenu
   */
  const getMenuItemPath = item => {
    const itemPath = conversionPath(item.path);
    const icon = getIcon(item.icon);
    const { target, name } = item;
    // Is it a http link
    if (/^https?:\/\//.test(itemPath)) {
      return (
        <a href={itemPath} target={target}>
          {icon}
          <span>{name}</span>
        </a>
      );
    }
    return (
      <Link to={itemPath} target={target} replace={itemPath === pathname}>
        {icon}
        <span>{name}</span>
      </Link>
    );
  };

  /**
   * get SubMenu or Item
   */
  const getSubMenuOrItem = item => {
    if (item.children && item.children.some(child => child.name)) {
      const childrenItems = getNavMenuItems(item.children);
      // 当无子菜单时就不展示菜单
      if (childrenItems && childrenItems.length > 0) {
        return (
          <SubMenu
            title={
              item.icon ? (
                <span>
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </span>
              ) : (
                item.name
              )
            }
            key={item.path}
          >
            {childrenItems}
          </SubMenu>
        );
      }
      return null;
    } else {
      return <Menu.Item key={item.path}>{getMenuItemPath(item)}</Menu.Item>;
    }
  };

  /**
   * 获得菜单子节点
   * @memberof SiderMenu
   */
  const getNavMenuItems = menusData => {
    if (!menusData) {
      return [];
    }
    return menusData
      .filter(item => item.name && !item.hideInMenu)
      .map(item => getSubMenuOrItem(item))
      .filter(item => item);
  };

  /**
   * 收起切换回调
   * @memberof SiderMenu
   */
  const onCollapse = () => {};

  return (
    <Layout.Sider
      collapsible
      trigger={null}
      theme={'light'}
      collapsed={global.collapsed}
      onCollapse={onCollapse}
    >
      <div className={styles['ant-pro-sider-menu-logo']}>
        <a href="/">
          <div className={styles['logo']} />
          <span hidden={global.collapsed}>new portal</span>
        </a>
      </div>
      {/* <a
        href="/"
        className={styles['logo']}
        style={{ height: 64, backgroundColor: '#178EFF' }}
      >
        <span>new portal</span>
      </a> */}
      <Menu {...menuProps}>{getNavMenuItems(menuData)}</Menu>
    </Layout.Sider>
  );
};

export default connect(({ menu, global }) => ({ menu, global }))(SiderMenu);
