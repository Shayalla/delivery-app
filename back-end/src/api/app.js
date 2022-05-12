const express = require('express');
const cors = require('cors');
const path = require('path');
const { customerRouter } = require('../controllers/customer');
const { registerRouter } = require('../controllers/register');
const { userRouter } = require('../controllers/users');
const { sellerRouter } = require('../controllers/seller');
const { administratorRouter } = require('../controllers/administrator');

const app = express();

app.use(express.json());
app.use(cors());

const staticDestination = path.join(__dirname, '..', 'database', 'images');
app.use('/images', express.static(staticDestination));

app.use('/login', userRouter);

app.use('/register', registerRouter);

app.use('/customer', customerRouter);

app.use('/seller', sellerRouter);

app.use('/admin', administratorRouter);

app.get('/', (_req, res) => res.redirect('/login'));

app.use((err, _req, res, _next) => { 
  console.log(' ########    ERRO    ########', err);
  return res.status(500).json(err);
});

module.exports = app;
