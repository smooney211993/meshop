import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import { getProductById } from '../../actions/productActions';
import { setAlert } from '../../actions/alertActions';

const UserEditScreen = ({ match }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, priceEmail] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItem);
  const { loading, error, product } = productItem;

  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch({ type: USER_UPDATE_RESET_ADMIN });
    if (!product.name || product._id !== productId || success) {
      dispatch(getProductById(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [dispatch, productId, product]);
  const submitHandler = (e) => {
    e.preventDefault();
    // update product
    dispatch(setAlert('User Successfully Updated', 'success'));
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {error && <Message variant='danger'>{error.msg}</Message>}
        {alert &&
          alert.map((x) => (
            <Message key={x.id} variant={x.alertType}>
              {x.msg}
            </Message>
          ))}
        {loading ? (
          <Spinner />
        ) : error ? (
          <Message variant='danger'>{error.msg}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='price'>
              <Form.Label>Price </Form.Label>
              <Form.Control
                type='price'
                placeholder='Enter Price'
                value={price}
                onChange={(e) => setEmail(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='brand'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='brand'
                placeholder='Enter Brand'
                value={brand}
                onChange={(e) => setBrand(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Enter category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId='countinstock'>
              <Form.Label>Count In Stock</Form.Label>
              <Form.Control
                type='countinstock'
                placeholder='Enter Count In Stock'
                value={countInStock}
                onChange={(e) =>
                  setCountInStock(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId='description'>
              <Form.Label>description</Form.Label>
              <Form.Control
                type='description'
                placeholder='Enter Description'
                value={description}
                onChange={(e) => setDescription(e.target.value)}></Form.Control>
            </Form.Group>

            <Button type='submit' variant='primary'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;