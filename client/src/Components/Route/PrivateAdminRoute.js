import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const userLoginRegister = useSelector((state) => state.userLoginRegister);
  const { isAuthenticated, loading, userInfo } = userLoginRegister;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading && !userInfo.isAdmin ? (
          <Redirect to='/' />
        ) : (
          <Component {...props} />
        )
      }></Route>
  );
};

export default PrivateAdminRoute;
