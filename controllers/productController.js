const Product = require('../models/product');
const User = require('../models/user');

// fetch all products
// public route
// api/product
const getProducts = async (req, res) => {
  const pageSize = 6;
  const page = Number(req.query.pageNumber) || 1;
  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};
  // check if there is query param of keyword if not returns an empty object
  try {
    const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (page - 1));
    res.json({ products, page, pages: Math.ceil(count / pageSize) });
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
// post
//create new review
//private
// api/products/:id/reviews
const createNewReview = async (req, res) => {
  const { rating, comment } = req.body;
  try {
    const product = await Product.findById(req.params.id);
    const user = await User.findById(req.user.id);
    if (!product) {
      return res.status(404).json({ errors: [{ msg: 'Product Not Found' }] });
    }
    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user.id
    );

    if (alreadyReviewed) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'Product Already Reviewed' }] });
    }

    const review = {
      name: user.name,
      rating: Number(rating),
      comment,
      user: req.user.id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    await product.save();
    res.status(201).json({ msg: 'Reviews Added' });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// get the top rated products
// get api/products/top
// public
const getTopRatedProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3);
    console.log(products);
    if (!products) {
      return res.status(404).json({ errors: [{ msg: 'Products Not Found' }] });
    }
    res.json(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Product Not Found' }] });
  }
};
module.exports = {
  getProducts,
  getProductsById,
  deleteProductById,
  createProduct,
  updateProductById,
  createNewReview,
  getTopRatedProducts,
};
