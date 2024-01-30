const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Serwer działa!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});

const Product = require('./models/Product');

app.post('/products', async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.status(201).send(newProduct);
    } catch (error) {
        res.status(400).send(error);
    }
});

const Customer = require('./models/Customer');

// Dodawanie nowego klienta
app.post('/customers', async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).send(customer);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Pobieranie listy klientów
app.get('/customers', async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.send(customers);
    } catch (error) {
        res.status(500).send(error);
    }
});

const Order = require('./models/Order');
const Product = require('./models/Product');

// Tworzenie nowego zamówienia
app.post('/orders', async (req, res) => {
    try {
        const order = new Order(req.body);

        // Obliczanie łącznej kwoty zamówienia
        let totalPrice = 0;
        for (const item of order.products) {
            const product = await Product.findById(item.product);
            totalPrice += item.quantity * product.price;
        }
        order.totalPrice = totalPrice;

        await order.save();
        res.status(201).send(order);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Pobieranie listy zamówień
app.get('/orders', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('customer').populate('products.product');
        res.send(orders);
    } catch (error) {
        res.status(500).send(error);
    }
});
