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

// Pobieranie listy aktywnych produktów
app.get('/products', async (req, res) => {
    try {
        const products = await Product.find({ isActive: true });
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Edycja istniejącego produktu
app.put('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
        res.send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Usuwanie istniejącego produktu
app.delete('/products/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, { isActive: false }, { new: true });
        res.send(product);
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

// Tworzenie nowego zamówienia
app.post('/orders', async (req, res) => {
    try {
        const orderData = req.body;

        let totalPrice = 0;
        const productsDetails = await Promise.all(orderData.products.map(async (item) => {
            const product = await Product.findById(item.product);
            totalPrice += item.quantity * product.price;
            return {
                product: item.product,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            };
        }));

        const order = new Order({
            ...orderData,
            products: productsDetails,
            totalPrice: totalPrice
        });

        await order.save();
        res.status(201).send(order);
    } catch (error) {
        console.log(error);
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

// Endpoint do pobierania agregowanych danych sprzedaży produktów w określonym zakresie dat oraz klientów
app.get('/sales', async (req, res) => {
    try {
        const { startDate, endDate, customerId } = req.query;

        const filters = {};
        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            end.setDate(end.getDate() + 1);
            filters.date = { $gte: start, $lt: end };
        }
        if (customerId) {
            filters.customer = customerId;
        }

        const orders = await Order.find(filters).populate({
            path: 'products.product',
            model: 'Product'
        }).populate({
            path: 'customer',
            model: 'Customer'
        });

        const salesData = new Map();
        orders.forEach(order => {
            order.products.forEach(({ product, quantity }) => {
                const productIdString = product._id.toString();
                const productData = salesData.get(productIdString) || {
                    productId: productIdString,
                    name: product.name,
                    price: product.price,
                    soldQuantity: 0,
                    totalSales: 0,
                    customerNames: new Set()
                };
                productData.soldQuantity += quantity;
                productData.totalSales += quantity * product.price;
                if (order.customer) {
                    productData.customerNames.add(order.customer.name);
                }
                salesData.set(productIdString, productData);
            });
        });

        const salesArray = Array.from(salesData.values()).map(sale => ({
            ...sale,
            customerNames: Array.from(sale.customerNames)
        }));

        res.send(salesArray);
    } catch (error) {
        res.status(500).send(error);
    }
});





