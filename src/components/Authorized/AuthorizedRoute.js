import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Authorized from './Authorized';

const AuthorizedRoute = ({
  component: Component,
  render,
  authority,
  redirectPath,
  ...rest
}) => {
  return (
    <Authorized
      authority={authority}
      noMatch={
        <Route
          {...rest}
          render={() => <Redirect to={{ pathname: redirectPath }} />}
        />
      }
    >
      <Route
        {...rest}
        render={props => (Component ? <Component {...props} /> : render(props))}
      />
    </Authorized>
  );
};

export default AuthorizedRoute;
