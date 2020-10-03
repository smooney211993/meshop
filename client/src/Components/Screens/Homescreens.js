import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import axios from 'axios';
import Product from '../Product/Product';

// redux
import { connect } from 'react-redux';
import { getProducts } from '../../actions/productActions';

const Homescreens = ({ getProducts, products: { products } }) => {
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} key={product._id}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};
const mappedStateToProps = (state) => ({
  products: state.productReducer,
});
export default connect(mappedStateToProps, { getProducts })(Homescreens);
