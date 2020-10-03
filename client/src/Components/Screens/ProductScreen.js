import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import Rating from '../Layouts/Rating';
import Spinner from '../Layouts/Spinner';
import Message from '../Layouts/Message';
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/productActions';
const ProductScreen = ({ match }) => {
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItem);
  const { product, loading, error } = productItem;
  useEffect(() => {
    dispatch(getProductById(match.params.id));
  }, [dispatch, match]);
  return (
    <>
      <div>{product.name}</div>
      <Link to='/' className='btn btn-light my-3'>
        Back
      </Link>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message>{error.msg}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={3}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating value={product.rating} text={`${product.numReviews}`} />{' '}
                Reviews
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <Row>
                    <Col>Price</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                  <ListGroup.Item>
                    <Button
                      className='btn-block'
                      disabled={product.countInStock === 0}>
                      Add To Cart
                    </Button>
                  </ListGroup.Item>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
