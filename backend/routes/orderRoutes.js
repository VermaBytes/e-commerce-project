const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/place', orderController.placeOrder);

router.get('/all', orderController.getAllOrders);

router.get('/:id', orderController.getOrderDetails);

router.put('/status/:id', orderController.updateStatus);

router.get('/user/:userId', orderController.getUserOrders);

module.exports = router;