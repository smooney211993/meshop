const Product = require('../models/product');
const authToken = require('../middleware/authToken');
const isAdmin = require('../middleware/isAdmin');

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

module.exports = {
  getProducts,
  getProductsById,
};
