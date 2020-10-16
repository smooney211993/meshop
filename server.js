const morgan = require('morgan');
const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products = require('./routes/products');
const user = require('./routes/user');
const auth = require('./routes/auth');
const admin = require('./routes/admin');
const orders = require('./routes/order');
const upload = require('./routes/upload');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

connectDB();

app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use('/api/products', products);
app.use('/api/users', user);
app.use('/api/auth', auth);
app.use('/api/orders', orders);
app.use('/api/admin', admin);
app.get(`/api/config/paypal`, (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);
app.use('/api/upload', upload);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(
    `server ${PORT} is up and running in ${process.env.NODE_ENV} mode`
  );
});
