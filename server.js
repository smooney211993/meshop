const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products = require('./routes/products');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

app.use(express.json());

app.use('/api/products', products);

app.listen(PORT, () => {
  console.log(
    `server ${PORT} is up and running in ${process.env.NODE_ENV} mode`
  );
});
