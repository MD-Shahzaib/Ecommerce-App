const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

// Get all orders
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find().populate('user product');
        res.json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new order
router.post('/', async (req, res) => {
    const order = new Orders({
        user: req.body.userId,
        product: req.body.productId,
        quantity: req.body.quantity,
    });

    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
