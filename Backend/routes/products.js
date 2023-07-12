const express = require('express');
const router = express.Router();
const Products = require('../models/Products');

// GET-ALL-PRODUCTS = (GET="http://localhost:5000/api/products")=(no-auth Required).
router.get('/', async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET-SPECIFIC-PRODUCTS = (GET="http://localhost:5000/api/products/productId")=(no-auth Required).
router.get('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const specificProduct = await Products.findById(_id);
        res.status(201).json(specificProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// CREATE-PRODUCTS = (POST="http://localhost:5000/api/products")=(auth Required).
router.post('/', async (req, res) => {
    const data = req.body;
    const product = new Products(data);
    try {
        const newProduct = await product.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// UPDATE-PRODUCTS = (PUT="http://localhost:5000/api/products/productId")=(auth Required).
router.put('/:id', async (req, res) => {
    const _id = req.params.id;
    const data = req.body;
    try {
        const updateProduct = await Products.findByIdAndUpdate(_id, data);
        res.status(201).json(updateProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

// DELETE-PRODUCTS = (DELETE="http://localhost:5000/api/products/productId")=(auth Required).
router.delete('/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const deleteProduct = await Products.findByIdAndDelete(_id);
        res.status(201).json(deleteProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;