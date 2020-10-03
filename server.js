const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const products = require('./routes/products');
app.use(express.json());
app.use('/api/products', products);

app.listen(PORT, () => {
  console.log(`server ${PORT} is up and running`);
});
