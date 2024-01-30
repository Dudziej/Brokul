const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    date: Date,
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    },
    products: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        quantity: Number
    }],
    totalPrice: Number
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
