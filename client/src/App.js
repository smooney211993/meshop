import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './Components/Layouts/Header';
import Footer from './Components/Layouts/Footer';

const App = () => {
  return (
    <>
      <Header />
      <Container></Container>
      <main>
        <Container>
          <h1>Hello</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
