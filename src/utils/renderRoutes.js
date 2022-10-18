import React, { useMemo, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Authorized from './Authorized';
import dynamicWrapper from 'utils/dynamicWrapper';
import flattenDeep from 'lodash/flattenDeep';
import compact from 'lodash/compact';
import constant from 'config/constant.config';

const { AuthorizedRoute } = Authorized;

/**
 * @name RouteWithProps
 * @param {*} param
 */
const RouteWithProps = props => {
  const {
    path,
    exact = true,
    strict = true,
    sensitive = true,
    location,
    models,
    component,
    routes = [],
    ...rest
  } = props;

  // 修复点击左侧菜单pathname不变时 异步组件仍然重复渲染
  const PresentComponent = useMemo(() => {
    return dynamicWrapper(constant.APP, models, component, routes);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(models), component, JSON.stringify(routes)]);

  // 当组件 uncomponent 时候自动调用model中的clear
  useEffect(() => {
    return () => {
      models &&
        models.forEach(model =>
          constant.APP._store.dispatch({
            type: `${model.substring(model.lastIndexOf('/') + 1)}/clear`,
          })
        );
    };
  }, [models]);

  console.log(
    `RouteWithProps----------------${component}   authority  : ${props.authority}`
  );
  return (
    <AuthorizedRoute
      path={path}
      exact={exact}
      strict={strict}
      sensitive={sensitive}
      authority={props.authority}
      redirectPath={'/exception/403'}
      render={selfProps => (
        <PresentComponent {...{ ...selfProps, route: rest }} />
      )}
    />
  );
};
/**
 * @name renderRoutes
 * @param {*} param = { routes, extraProps }
 */
const renderRoutes = ({ routes, extraProps = {} }) => {
  const routesList = routes
    ? routes.map((route, i) => {
        if (route.redirect) {
          return (
            <Redirect
              key={route.key || `${route.path} - ${i}`}
              from={route.path}
              to={route.redirect}
              exact={true}
              strict={route.strict}
              sensitive={route.sensitive}
            />
          );
        }
        return [
          <RouteWithProps
            key={route.key || `${route.path} - ${i}`}
            {...route}
            {...extraProps}
          />,
          ...(route.routes
            ? renderRoutes({
                routes: route.routes,
                extraProps,
              })
            : []),
        ];
      })
    : null;
  return compact(routesList);
};

export default renderRoutes;
