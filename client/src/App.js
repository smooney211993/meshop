import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';
import Homescreens from './Components/Screens/Homescreens';

const App = () => {
  return (
    <>
      <Header />
      <Container></Container>
      <main>
        <Container>
          <Homescreens />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
