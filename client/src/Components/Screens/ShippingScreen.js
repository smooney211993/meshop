import React, { useState } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../Layouts/FormContainer';

const ShippingScreen = ({ history }) => {
  const [formState, setFormState] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });

  const inputHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { address, city, postalCode, country } = formState;
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form.Group controlId='name'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='address'
          placeholder='Enter Address'
          value={address}
          required
          onChange={inputHandler}></Form.Control>
      </Form.Group>
      <Form.Group controlId='city'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='city'
          placeholder='Enter City'
          value={city}
          required
          onChange={inputHandler}></Form.Control>
      </Form.Group>
      <Form.Group controlId='postalCode'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='postalCode'
          placeholder='Enter Post Code'
          value={postalCode}
          required
          onChange={inputHandler}></Form.Control>
      </Form.Group>
      <Form.Group controlId='country'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='country'
          placeholder='Enter Country'
          value={country}
          required
          onChange={inputHandler}></Form.Control>
      </Form.Group>
    </FormContainer>
  );
};

export default ShippingScreen;
