import React, { useEffect, useMemo } from 'react';
import { Layout, Modal, Menu, Icon, Spin } from 'antd';
import { connect } from 'dva';
import { Route, Switch, Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { ContainerQuery } from 'react-container-query';
import pathToRegexp from 'path-to-regexp';
import renderRoutes from 'utils/renderRoutes';
import Authorized from 'utils/Authorized';
import { getAuthority } from 'utils/authority';
import { SiderMenu, GlobalHeader, GlobalNprogress } from 'components';
import NotFound from 'pages/exception/404';
import styles from './basicLayout.module.less';

const { Content } = Layout;

/**
 * BasicLayout
 * @param {*} param
 */
const BasicLayout = ({ subRoutes, ...props }) => {
  const { dispatch, menu, history, location } = props;
  const noPaddingPage = location.pathname === '/main/caseDetail';
  const stableHeightPage =
    ['/main/index', '/main/caseDetail'].indexOf(location.pathname) !== -1;
  useEffect(() => {
    (async () => {
      // 请求当前用户数据
      const { authority = '' } = await dispatch({
        type: 'global/fetchCurrent',
      });
      dispatch({
        type: 'menu/init',
        payload: {
          routes: subRoutes,
          authority: authority,
          path: '/',
        },
      });
      dispatch({
        type: 'global/fetchPrivilege',
      });
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * @name routerList
   * @description 获取路由列表,使用 useMome hook 限制调用次数
   */
  const routerList = useMemo(() => {
    return renderRoutes({ routes: menu.routerData });
  }, [menu.routerData]);

  return (
    <>
      <GlobalNprogress />
      <Layout className={styles['layout']}>
        <SiderMenu location={location} />
        <Layout>
          <GlobalHeader {...{ dispatch }} />

          <Content className={styles['main']}>
            <div className={styles['page-name']}>
              {menu['menuPathNameMap'][location.pathname]}
            </div>
            <div
              style={{
                height: stableHeightPage ? 'calc(100vh - 120px)' : 'auto',
              }}
              className={styles[noPaddingPage ? '' : 'wrapper']}
            >
              <div
                style={{ height: '100%' }}
                className={styles[noPaddingPage ? '' : 'content']}
              >
                {/* 判断登陆状态 */}
                {/* {getAuthority() === 'NULL' && <Redirect to={'/user'} />} */}
                {menu.routerData.length ? (
                  <Switch>
                    {routerList}
                    <Route render={NotFound} />
                  </Switch>
                ) : null}
              </div>
            </div>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default connect(({ global, menu }) => ({
  global,
  menu,
}))(BasicLayout);
