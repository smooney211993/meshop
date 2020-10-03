const express = require('express');
const router = express.Router();
const products = require('../products');
router.get('/', (req, res) => {
  res.json(products);
});

router.get('/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (!product) {
    return res.status(404).json({ error: 'Product Not Found' });
  }

  res.json(product);
});
module.exports = router;
