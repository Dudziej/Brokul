const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb://localhost:27017/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(cors());
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

// Pobieranie listy produktów
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({});
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
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


// Endpoint do pobierania agregowanych danych sprzedaży produktów
app.get('/sales', async (req, res) => {
    try {
        const orders = await Order.find({}).populate('products.product');

        const salesData = new Map();

        orders.forEach(order => {
            order.products.forEach(({ product, quantity }) => {
                if (salesData.has(product._id.toString())) {
                    let prodData = salesData.get(product._id.toString());
                    prodData.soldQuantity += quantity;
                    prodData.totalSales += quantity * product.price;
                    salesData.set(product._id.toString(), prodData);
                } else {
                    salesData.set(product._id.toString(), {
                        productId: product._id,
                        name: product.name,
                        price: product.price,
                        soldQuantity: quantity,
                        totalSales: quantity * product.price
                    });
                }
            });
        });

        const salesArray = Array.from(salesData.values());

        res.send(salesArray);
    } catch (error) {
        res.status(500).send(error);
    }
});

