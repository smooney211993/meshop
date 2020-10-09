const Order = require('../models/order');

// create new order
// post/api/order

const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  try {
    if (orderItems && orderItems.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'No Order Items' }] });
    }
    const order = new Order({
      orderItems,
      user: req.user.id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });
    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

// get order byID
//private
// getOrderById
// route api/orders/:id

const getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      'user',
      'name email'
    );
    if (!order) {
      return res.status(404).json({ errorrs: [{ msg: 'Order Not Found' }] });
    }
    console.log(order);
    res.json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Error' }] });
  }
};

const updateOrderToPaid = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(400).json({ errors: [{ msg: 'Order Not Found' }] });
    }
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errors: [{ msg: 'Server Errror' }] });
  }
};

// update order to paid
// route api/orders/:id/paid
// private

module.exports = {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
};