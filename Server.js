const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const Clients_info = require('./model/Client');

// express app
const app = express();


//bagyb l files l mn file env 3ashan a5fyha
require('dotenv').config();
const dbURI = process.env.dbURI;
// app.use(session({ secret: 'Your_Secret_Key' }));
// listen for requests
mongoose.connect(dbURI)
  .then(result => app.listen(8080))
  .catch(err => console.log(err));


// default options
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

app.get('/loginPage', (req, res) => {
    res.render('loginPage');
});

app.get('/admin', (req, res) => {
    res.render('admin');
});

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/team', (req, res) => {
    res.render('team');
});

app.post('/loginPage-action', (req, res) => 
{
    
    const Client = new Clients_info({
        Full_Name: req.body.fn,
        Email: req.body.em,
        Password: req.body.ps
      });

      Client.save()
        .then(result => {
          res.redirect('/');
        })
        .catch(err => {
          console.log(err);
        });

});
