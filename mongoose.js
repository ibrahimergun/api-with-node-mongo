const mongoose = require('mongoose');
const Product = require('./models/products');
const uuid = require('uuid');

mongoose
  .connect(
    'mongourl',
  )
  .then(() => {
    console.log('Connection succesfully');
  })
  .catch((error) => {
    console.log(error.message);
  });

const createProduct = async (req, res, next) => {
  const createdProduct = new Product({
    id: uuid.v4(),
    name: req.body.name,
    price: req.body.price,
  });

  const result = await createdProduct.save().then(() => {
    console.log(createdProduct.id , createdProduct._id);
    res.json(createdProduct);
  });
};

const getProduct = async (req, res, next) => {
  const productList = await Product.find().exec();
  res.json(productList);
};

exports.createProduct = createProduct;
exports.getProduct = getProduct;
