import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Meta from '../Layouts/Meta';
import Product from '../Product/Product';
import Spinner from '../Layouts/Spinner';
import Message from '../Layouts/Message';
import Paginate from '../Layouts/Paginate';
import ProductCarousel from '../Layouts/ProductCarousel';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../actions/productActions';

const Homescreens = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { products, loading, error, page, pages } = productList;
  useEffect(() => {
    dispatch(getProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);
  return (
    <>
      <Meta />
      {!keyword ? (
        <ProductCarousel />
      ) : (
        <Link to='/' className='btn btn-primary'>
          Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error.msg}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col sm={12} md={6} lg={4} key={product._id}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default Homescreens;
