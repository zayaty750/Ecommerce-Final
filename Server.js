const express = require('express');
// const session = require('express-session')
// express app
const app = express();
// app.use(session({ secret: 'Your_Secret_Key' }));
// listen for requests
app.listen(8000);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/Home', (req, res) => {
    res.render('Home');
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
