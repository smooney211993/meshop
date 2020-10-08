import React, { useState, useEffect } from 'react';

import { Form, Button, Col, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cartSavePaymentMethod } from '../../actions/cartActions';

import FormContainer from '../Layouts/FormContainer';
import CheckoutSteps from '../Layouts/CheckoutSteps';

const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [paymentMethod, setPaymentMethod] = useState('Paypal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(cartSavePaymentMethod(paymentMethod));
    history.push('/placeorder');
  };
  useEffect(() => {
    if (!shippingAddress) {
      history.push('/shipping');
    }
  }, [shippingAddress]);
  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select Method</Form.Label>

          <Row>
            <Col>
              <Form.Check
                type='radio'
                label='Paypal or Credit Card'
                id='PayPal'
                name='paymentMethod'
                value='PayPal'
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
              <Form.Check
                type='radio'
                label='Stripe'
                id='Stripe'
                name='paymentMethod'
                value='Stripe'
                onChange={(e) => setPaymentMethod(e.target.value)}></Form.Check>
            </Col>
          </Row>
        </Form.Group>
        <Button type='submit' variant='primary'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
