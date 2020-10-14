import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../Layouts/Message';
import Spinner from '../Layouts/Spinner';
import { setAlert } from '../../actions/alertActions';
import {
  getProducts,
  deleteProductById,
  createProduct,
} from '../../actions/productActions';
import {
  PRODUCT_DELETE_RESET,
  PRODUCT_CREATE_RESET,
} from '../../actions/types';

const ProductListScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, products, error } = productList;
  const userLogin = useSelector((state) => state.userLoginRegister);
  const { userInfo } = userLogin;
  const {
    success: deleteSuccess,
    loading: deleteLoading,
    error: deleteError,
  } = useSelector((state) => state.productDelete);

  const {
    success: createSuccess,
    loading: createLoading,
    error: createError,
    product,
  } = useSelector((state) => state.productCreate);

  const alert = useSelector((state) => state.alert);

  useEffect(() => {
    dispatch({ type: PRODUCT_DELETE_RESET });
    dispatch({ type: PRODUCT_CREATE_RESET });
    if (userInfo && userInfo.isAdmin) {
      dispatch(getProducts());
    } else {
      history.push('/login');
    }
    if (createSuccess) {
      history.push(`/admin/product/${product._id}/edit`);
    } else {
      dispatch(getProducts());
    }
  }, [dispatch, history, userInfo, deleteSuccess, createSuccess, product]);
  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure. This Action Can Not Be Undone')) {
      dispatch(deleteProductById(id));
      dispatch(setAlert('User Successfully Deleted', 'success'));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct(history));
  };
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className='text-right'>
          <Button className='my-3' onClick={createProductHandler}>
            {' '}
            <i className='fas fa-plus'></i>Create Product
          </Button>
        </Col>
      </Row>
      {deleteLoading && <Spinner />}
      {createLoading && <Spinner />}
      {createError && <Message variant='danger'>{deleteError.msg}</Message>}
      {createError && <Message variant='danger'>{createError.msg}</Message>}

      {alert.length > 0 &&
        alert.map((x) => (
          <Message key={x.id} variant={x.alerType}>
            {x.msg}
          </Message>
        ))}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Message variant='danger'>{error.msg}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
            </tr>
          </thead>
          <tbody>
            {products !== null &&
              products.map((product) => (
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td>
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </Link>
                    <Button
                      variant='danger'
                      className='btn-sm'
                      onClick={() => deleteHandler(product._id)}>
                      <i className='fas fa-trash'></i>
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default ProductListScreen;
