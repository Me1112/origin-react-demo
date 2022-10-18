import React from 'react';
import { connect } from 'dva';
import { withRouter } from 'react-router-dom';
import { Layout, Menu, Dropdown, Icon, Input, Col } from 'antd';
import styles from './index.module.less';

const GlobalHeader = props => {
  const { dispatch, location, global } = props;
  console.log(props);
  const logout = () => {
    dispatch({
      type: 'login/logout',
      payload: { location },
    });
  };

  const overlay = [{ label: `退出`, icon: 'poweroff', action: logout }];

  const menu = (
    <Menu>
      {overlay.map(item => (
        <Menu.Item key={item}>
          <a onClick={item.action}>
            <Icon type={item.icon} style={{ marginRight: '5px' }} />
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  );

  const triggerCollapse = () => {
    dispatch({
      type: 'global/changeLayoutCollapsed',
      payload: !global.collapsed,
    });
  };

  return (
    <Layout.Header className={styles.header}>
      <div className={styles['collapse']} onClick={triggerCollapse} />
      <div className={styles['header-options']}>
        <span className={styles['header-search']}>
          <Input placeholder="请输入搜索内容" />
        </span>
        <Dropdown overlay={<></>}>
          <Icon className={styles['option-item']} type="mail" />
        </Dropdown>
        <Dropdown overlay={<></>}>
          <Icon className={styles['option-item']} type="mail" />
        </Dropdown>
        <Dropdown overlay={<></>}>
          <Icon className={styles['option-item']} type="mail" />
        </Dropdown>
        <Dropdown overlay={<></>}>
          <Icon className={styles['option-item']} type="mail" />
        </Dropdown>
        <Dropdown overlay={menu}>
          <a className={styles.dropText}>
            <Icon type="user" />
            {' Admin'}
          </a>
        </Dropdown>
      </div>
    </Layout.Header>
  );
};
export default connect(({ global }) => ({ global }))(withRouter(GlobalHeader));
