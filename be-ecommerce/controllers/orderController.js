const Order = require('../models/Order');
const Product = require('../models/Product'); // If you want to verify product info

// Place a new order
const placeOrder = async (req, res) => {
  try {
    const { address, cart } = req.body;
    const userId = req.userId; // Assuming authentication middleware sets this

    if (!cart || cart.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Optional: Calculate totalAmount from cart
    let totalAmount = 0;
    for (const item of cart) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      totalAmount += product.price * (item.quantity || 1);
    }

    const newOrder = new Order({
      userId,
      address,
      cart,
      totalAmount,
    });

    await newOrder.save();

    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (err) {
    console.error('Error placing order:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get all orders for a user
const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate('cart.productId');
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching orders', error: err.message });
  }
};

// Admin: Get all orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId').populate('cart.productId');
    res.status(200).json({ orders });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching all orders', error: err.message });
  }
};

// Update order status (Admin)
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order status updated', order: updatedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Error updating status', error: err.message });
  }
};

module.exports = {
  placeOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};
