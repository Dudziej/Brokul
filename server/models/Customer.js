const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    address: String
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;
