const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Users', required: true },
    products: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Products', required: true },
        quantity: { type: Number, default: 1 },
        _id: false
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true, default: "Pending" }
}, { timestamps: true });

const Orders = mongoose.model('Orders', orderSchema);
module.exports = Orders;