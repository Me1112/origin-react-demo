import React from 'react';
import { Switch } from 'react-router-dom';
import { Layout } from 'antd';
import renderRoutes from 'utils/renderRoutes';
export default ({ subRoutes, app, ...props }) => {
  return (
    <Layout>
      <Switch>{renderRoutes({ routes: subRoutes })}</Switch>
    </Layout>
  );
};
