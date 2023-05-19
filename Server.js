const express = require('express');
const mongoose = require('mongoose');
// const session = require('express-session')
const Product = require('./model/Product');
// express app
const app = express();
const dbURI = 'mongodb+srv://zayaty:d11o3PfjEAmArBBQ@cluster0.33tbygn.mongodb.net/?retryWrites=true&w=majority';
// app.use(session({ secret: 'Your_Secret_Key' }));
// listen for requests
mongoose.connect(dbURI)
  .then(result => app.listen(8000))
  .catch(err => console.log(err));


app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/Home', (req, res) => {
    res.render('Home');
});

app.get('/cart', (req, res) => {
    res.render('cart');
});

app.get('/products', (req, res) => {
    res.render('products');
});

app.get('/products1', (req, res) => {
    res.render('products1');
});

app.get('/products2', (req, res) => {
    res.render('products2');
});

app.get('/products3', (req, res) => {
    res.render('products3');
});


app.get('/admin', (req, res) => {
    res.render('admin');
});
