const express = require('express');
const router = express.Router();
const Orders = require('../models/Orders');

// GET-ALL-ORDER = (GET="http://localhost:5000/api/orders")=(auth Required).
router.get('/', async (req, res) => {
    try {
        const orders = await Orders.find();
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch orders' });
    }
});

// GET-SPECIFIC-ORDER = (GET="http://localhost:5000/api/orders/orderId")=(auth Required).
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const order = await Orders.findById(_id);
        res.json(order);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch order' });
    }
});

// CREATE-ORDER = (POST="http://localhost:5000/api/orders")=(auth Required).
router.post('/', async (req, res) => {
    console.log("Body --->", req.body);
    const { userId, products, address, amount, status } = req.body;
    console.log("Body --->", userId, products, address, amount, status);
    const order = new Orders({ userId, products, address, amount, status });
    try {
        const newOrder = await order.save();
        res.status(201).json(newOrder);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE-ORDER = (PUT="http://localhost:5000/api/orders/orderId")=(auth Required).
router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    try {
        const updatedOrder = await Orders.findByIdAndUpdate(_id, data);
        res.json(updatedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update order' });
    }
});

// DELETE-ORDER = (DELETE="http://localhost:5000/api/orders/orderId")=(auth Required).
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deletedOrder = await Orders.findByIdAndDelete(_id);
        res.json(deletedOrder);
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete order' });
    }
});

module.exports = router;