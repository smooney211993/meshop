import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../Product/Product';
import Spinner from '../Layouts/Spinner';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';

const Homescreens = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading } = productList;
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : (
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
export default Homescreens;
