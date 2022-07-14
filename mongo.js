const express = require('express');
const router = express.Router();
const mongoDbClient = require('mongodb').MongoClient;
const uuid = require('uuid');


const url =
  'mongourl';

router.post('/', async (req, res, next) => {
  const NewProduct = {
    id: uuid.v4(),
    name: req.body.name,
    price: req.body.price,
  };

  const client = new mongoDbClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    const db = await client
      .db('products_test')
      .collection('products')
      .insertOne(NewProduct);
  } catch (error) {
    client.close();
    return res.json({ message: 'Could not store data' });
  }
  client.close();
  res.json(NewProduct);
});

router.get('/', async (req, res, next) => {
  let products;
  const client = new mongoDbClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  try {
    products = await client
      .db('products_test')
      .collection('products')
      .find()
      .toArray();
  } catch (error) {
    client.close();
    return res.json({ message: 'Could not store data' });
  }
  client.close();
  res.json(products);
});

module.exports = router;
