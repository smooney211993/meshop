import React from 'react';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Homescreens from './Components/Screens/Homescreens';
import ProductScreen from './Components/Screens/ProductScreen';
import CartScreen from './Components/Screens/CartScreen';
// redux

const App = () => {
  return (
    <Router>
      <Header />
      <Container></Container>
      <main>
        <Container>
          <Route exact path='/' component={Homescreens} />
          <Route exact path='/product/:id' component={ProductScreen} />
          <Route exact path='/card/:id?' component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
