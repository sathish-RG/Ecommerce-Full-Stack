const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth= require('../middlewares/auth')

// @route   POST /api/v1/order/place
// @desc    Place a new order (user only)
// @access  Private
router.post('/place', auth.checkAuth,auth.allowRoles(['user']), orderController.placeOrder);

// @route   GET /api/v1/order/my-orders
// @desc    Get current user's orders
// @access  Private
router.get('/my-orders',auth.checkAuth,auth.allowRoles(['user']), orderController.getUserOrders);

// @route   GET /api/v1/order
// @desc    Get all orders (admin)
// @access  Private (admin only)
router.get('/',auth.checkAuth,auth.allowRoles(['admin']), orderController.getAllOrders);

// @route   PUT /api/v1/order/:orderId/status
// @desc    Update an order's status (admin)
// @access  Private (admin only)
router.put('/:orderId/status', auth.checkAuth,auth.allowRoles(['admin']), orderController.updateOrderStatus);

module.exports = router;
