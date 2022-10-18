import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import dynamicWrapper from 'utils/dynamicWrapper';
import routerSetting from './config/router.config';

/**
 * @name RouterConfig
 * @param {*} param
 * 顶层入口路由配置dva固定参数
 * 注：为了解决react新版的componentWillUpdate的warning,和高版本兼容问题
 * 决定用react-router-dom 的Router,Switch,Route 代替dva包装的同名组件
 */
function RouterConfig({ history, app }) {
  // 解析一级路由并传递子路由交给layout组件解析和权限封装
  const routeList = routerSetting.map(topLevelRoute => {
    let { models, component } = topLevelRoute;
    let routeOption = {
      path: topLevelRoute.path,
      component: dynamicWrapper(app, models, component, topLevelRoute.routes),
    };
    return <Route key={topLevelRoute.path} {...routeOption}></Route>;
  });
  return (
    <Provider store={app._store}>
      <Router history={history}>
        <Switch>{routeList}</Switch>
      </Router>
    </Provider>
  );
}
export default RouterConfig;
