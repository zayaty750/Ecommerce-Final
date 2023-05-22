const express = require('express');
const session = require('express-session')
// const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const path = require('path')
const Client_registration = require('./model/Client');

// express app
const app = express();
require('dotenv').config();
const dbURI = process.env.dbURI;

mongoose.connect(dbURI)
  .then(result => app.listen(process.env.Port))
  .catch(err => console.log(err));


// default options
// app.use(fileUpload());
app.use(express.static('public'));
// app.use(session({ secret: 'Your_Secret_Key' }))
// register view engine
app.set('view engine', 'ejs');




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

app.get('/profile', (req, res) => {
    res.render('profile');
});

app.get('/team', (req, res) => {
    res.render('team');
});


app.get('/Signup', (req, res) => {
    res.render('Signup');
  });
  
app.post('/Signup-action', (req, res) => 
{
    
    const Client = new Client_registration({
        Name: req.body.fn,
        Email: req.body.em,
        Password: req.body.ps
      });

      Client.save()
        .then(result => {
          res.redirect('/Home');
        })
        .catch(err => {
          console.log(err);
        });

});
