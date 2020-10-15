import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../Product/Product';
import Spinner from '../Layouts/Spinner';
import Message from '../Layouts/Message';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';

const Homescreens = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error } = productList;
  useEffect(() => {
    dispatch(getProducts(keyword));
  }, [dispatch, keyword]);
  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error.msg}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col sm={12} md={6} lg={4} key={product._id}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default Homescreens;
