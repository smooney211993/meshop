import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Homescreens from './Components/Screens/Homescreens';
import ProductScreen from './Components/Screens/ProductScreen';
import CartScreen from './Components/Screens/CartScreen';
import LoginScreen from './Components/Screens/LoginScreen';
import { useDispatch } from 'react-redux';
import { loadUser } from './actions/userActions';
// redux

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Router>
      <Header />
      <Container></Container>
      <main>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route exact path='/' component={Homescreens} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route path='/cart/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
