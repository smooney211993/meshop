import React, { useState, useEffect } from 'react';

import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../../actions/cartActions';

import FormContainer from '../Layouts/FormContainer';

const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const initialState = {
    address: '',
    city: '',
    postalCode: '',
    country: '',
  };
  const [formState, setFormState] = useState(initialState);

  const inputHandler = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress(formState));
    history.push('/payment');
  };
  useEffect(() => {
    if (shippingAddress) {
      const shippingDetails = { ...initialState };
      for (const key in shippingAddress) {
        if (key in shippingDetails) shippingDetails[key] = shippingAddress[key];
      }
      setFormState(shippingDetails);
    }
  }, [shippingAddress]);
  const { address, city, postalCode, country } = formState;
  return (
    <FormContainer>
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            name='address'
            placeholder='Enter Address'
            value={address}
            required
            onChange={inputHandler}></Form.Control>
        </Form.Group>
        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            name='city'
            placeholder='Enter City'
            value={city}
            required
            onChange={inputHandler}></Form.Control>
        </Form.Group>
        <Form.Group controlId='postalCode'>
          <Form.Label>Post Code</Form.Label>
          <Form.Control
            type='text'
            name='postalCode'
            placeholder='Enter Post Code'
            value={postalCode}
            required
            onChange={inputHandler}></Form.Control>
        </Form.Group>
        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            name='country'
            placeholder='Enter Country'
            value={country}
            required
            onChange={inputHandler}></Form.Control>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
