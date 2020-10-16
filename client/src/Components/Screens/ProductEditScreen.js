import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import FormContainer from '../Layouts/FormContainer';
import {
  getProductById,
  updateProductAsAdmin,
} from '../../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../actions/types';
import axios from 'axios';

const ProductEditScreen = ({ match }) => {
  const productId = match.params.id;
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [uploading, setUploading] = useState(false);
  const dispatch = useDispatch();
  const productItem = useSelector((state) => state.productItem);
  const { loading, error, product } = productItem;
  const { loading: updateLoading, success: updateSuccess } = useSelector(
    (state) => state.productUpdate
  );

  const alert = useSelector((state) => state.alert);
  useEffect(() => {
    dispatch({ type: PRODUCT_UPDATE_RESET });
    if (!product.name || product._id !== productId || updateSuccess) {
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
  }, [dispatch, productId, product, updateSuccess]);
  const submitHandler = (e) => {
    e.preventDefault();
    const body = {
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description,
    };
    dispatch(updateProductAsAdmin(body, productId));
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    setImage(file);
    setUploading(true);
    try {
      const config = {
        headers: {
          'Content-type': 'multipart/form-data',
        },
      };
      const { data } = await axios.post('/api/upload', formData, config);
      setImage(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
    } finally {
      setUploading(false);
    }
  };
  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Back
      </Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {updateLoading && <Spinner />}
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
                onChange={(e) => setPrice(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='image'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                onChange={(e) => setImage(e.target.value)}></Form.Control>
              <Form.File
                id='image-file'
                label='Choose File'
                custom
                onChange={uploadFileHandler}></Form.File>
              {uploading && <Spinner />}
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
