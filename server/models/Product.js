const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    isActive: {
        type: Boolean,
        default: true
      }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
