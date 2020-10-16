import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Homescreens from './Components/Screens/Homescreens';
import ProductScreen from './Components/Screens/ProductScreen';
import CartScreen from './Components/Screens/CartScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import registerScreen from './Components/Screens/RegisterScreen';
import ShippingScreen from './Components/Screens/ShippingScreen';
import ProfileScreen from './Components/Screens/ProfileScreen';
import PaymentScreen from './Components/Screens/PaymentScreen';
import PlaceOrderScreen from './Components/Screens/PlaceOrderScreen';
import OrderScreen from './Components/Screens/OrderScreen';
import OrderListScreen from './Components/Screens/OrderListScreen';
import UserListScreen from './Components/Screens/UserListScreen';
import UserEditScreen from './Components/Screens/UserEditScreen';
import ProductListScreen from './Components/Screens/ProductListScreen';
import ProductEditScreen from './Components/Screens/ProductEditScreen';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
import PrivateRoute from './Components/Route/PrivateRoute';
import PrivateAdminRoute from './Components/Route/PrivateAdminRoute';
// redux

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <main>
        <Container>
          <Switch>
            <Route path='/login' component={LoginScreen} />
            <Route exact path='/' component={Homescreens} />
            <Route path='/search/:keyword' component={Homescreens} />
            <Route path='/page/:pageNumber' component={Homescreens} />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={Homescreens}
            />
            <Route exact path='/product/:id' component={ProductScreen} />
            <Route path='/cart/:id?' component={CartScreen} />
            <Route path='/register' component={registerScreen} />
            <PrivateRoute exact path='/profile' component={ProfileScreen} />
            <PrivateRoute exact path='/shipping' component={ShippingScreen} />
            <PrivateRoute exact path='/payment' component={PaymentScreen} />
            <PrivateRoute
              exact
              path='/placeorder'
              component={PlaceOrderScreen}
            />
            <PrivateRoute exact path='/order/:id' component={OrderScreen} />
            <PrivateAdminRoute
              path='/admin/userlist'
              component={UserListScreen}
            />
            <PrivateAdminRoute
              path='/admin/user/:id'
              component={UserEditScreen}
            />
            <PrivateAdminRoute
              path='/admin/productlist'
              component={ProductListScreen}
            />
            <PrivateAdminRoute
              path='/admin/product/:id/edit'
              component={ProductEditScreen}
            />
            <PrivateAdminRoute
              path='/admin/orderlist'
              component={OrderListScreen}
            />
          </Switch>
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
