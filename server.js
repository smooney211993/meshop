const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products = require('./routes/products');
const user = require('./routes/user');
const auth = require('./routes/auth');
const orders = require('./routes/order');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

app.use(express.json());

app.use('/api/products', products);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/orders', orders);

app.listen(PORT, () => {
  console.log(
    `server ${PORT} is up and running in ${process.env.NODE_ENV} mode`
  );
});
