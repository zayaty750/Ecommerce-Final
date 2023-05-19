const express = require('express');
// const session = require('express-session')
// express app
const app = express();
// app.use(session({ secret: 'Your_Secret_Key' }));
// listen for requests
app.listen(8080);
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/Home', (req, res) => {
    res.render('Home');
});
