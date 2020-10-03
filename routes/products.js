const express = require('express');
const router = express.Router();
const Product = require('../models/product');
// fetch all products
// public route
// api/product
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
// fetch products by id
// public route
// api/product/:id
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ msg: 'Product Not Found' });
    }
    res.json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ msg: 'Server Error' });
  }
});
module.exports = router;
