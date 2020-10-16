import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Carousel, Image } from 'react-bootstrap';
import Spinner from './Spinner';
import Message from './Message';
import { useDispatch, useSelector } from 'react-redux';
import { getTopRatedProducts } from '../../actions/productActions';
const ProductCarousel = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.productTopRated
  );
  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch(getTopRatedProducts());
  }, [dispatch]);
  return loading ? (
    <Spinner />
  ) : alert.length > 0 ? (
    alert.map((x) => (
      <Message key={x.id} variant={x.alertType}>
        {x.msg}
      </Message>
    ))
  ) : (
    <Carousel pause='hover' className='bg-dark'>
      {products.map((product) => (
        <Carousel.Item key={product._id}>
          <Link to={`/product/${product._id}`}>
            <Image src={product.image} alt={product.name} fluid />
            <Carousel.Caption className='carousel-caption'>
              <h2>
                {product.name} ({product.price})
              </h2>
            </Carousel.Caption>
          </Link>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default ProductCarousel;
