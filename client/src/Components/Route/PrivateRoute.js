import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const userLoginRegister = useSelector((state) => state.userLoginRegister);
  const { isAuthenticated, loading } = userLoginRegister;

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthenticated && !loading ? (
          <Redirect to='/login' />
        ) : (
          <Component {...props} />
        )
      }></Route>
  );
};

export default PrivateRoute;
