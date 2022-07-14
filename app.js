const express = require('express');
const bodyParser = require('body-parser');

const productsRoute = require('./mongo');
const mongoosee = require('./mongoose');;

const app = express();

app.use(bodyParser.json());

app.use('/products', productsRoute); //with router

app.post('/productss', mongoosee.createProduct);

app.get('/productss', mongoosee.getProduct);

app.listen(3000);
