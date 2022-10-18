import React, { lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { isReactComponent } from 'utils/utils';

const modelNotExisted = (app, model) =>
  // eslint-disable-next-line
  !app._models.some(({ namespace }) => {
    return namespace === model.substring(model.lastIndexOf('/') + 1);
  });

// wrapper of dynamic
/**
 * @description 根据路由配置信息注册数据model 并使用Lazy把普通组件转换为异步加载组件
 * @param {} app
 * @param {*} models
 * @param {*} componentPath
 * @param {*} subRoutes
 */
const dynamicWrapper = (app, models, componentPath, subRoutes = []) => {
  // register models
  models &&
    models.forEach(model => {
      // 防止重复加载数据model
      if (model && modelNotExisted(app, model)) {
        const modelObj = require(`models/${model}`).default;
        // eslint-disable-next-line
        app.model(modelObj);
      }
    });
  if (!componentPath) return () => null;
  // eslint-disable-next-line
  let LazyComponent;
  typeof componentPath === 'string' &&
    (LazyComponent = lazy(() => import(`../${componentPath}`)));

  return props =>
    LazyComponent ? (
      <Suspense fallback={<Spin size="large" className="global-spin" />}>
        <LazyComponent {...{ ...props, subRoutes }} />
      </Suspense>
    ) : isReactComponent(componentPath) ? (
      <componentPath {...{ ...props, subRoutes }} />
    ) : null;
};

export default dynamicWrapper;
