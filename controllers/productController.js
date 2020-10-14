const Product = require('../models/product');

// fetch all products
// public route
// api/product
const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Product Not Found' }] });
  }
};

// fetch products by id
// public route
// api/product/:id
const getProductsById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ errors: [{ msg: 'Product Not Found' }] });
    }
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// delete product by id
// private and only admin
//api/admin/product/:id
const deleteProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product Not Found' }] });
    }
    await product.remove();
    res.json({ msg: 'Product Successfully Removed' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// update product by id
//api/admin/product/:id
const updateProductById = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
  } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product Not Found' }] });
    }
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updateProduct = await product.save();
    res.json(updateProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};
//create product
//post api/admin/products/create
//private/admin
const createProduct = async (req, res) => {
  try {
    const product = new Product({
      name: 'Sample Name',
      price: 0,
      user: req.user.id,
      image: '/image/sample.jpg',
      brand: 'Sample Brand',
      category: 'Sample Category',
      countInStock: 0,
      numReviews: 0,
      description: 0,
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

module.exports = {
  getProducts,
  getProductsById,
  deleteProductById,
  createProduct,
  updateProductById,
};
