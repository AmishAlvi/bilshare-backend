const express = require('express')
var Product = require('../models/product_model')
const router = express.Router();

router.get('/products', (req, res, next) => {

  //this will return all the data, exposing only the id and action field to the client
  Product.find({}, 'product')
    .then(data => res.json(data))
    .catch(next)
});

router.post('/products', (req, res, next) => {
  if(req.body.action){
    Product.create(req.body)
      .then(data => res.json(data))
      .catch(next)
  }else {
    res.json({
      error: "The input field is empty"
    })
  }
});

router.delete('/products/:id', (req, res, next) => {
  Product.findOneAndDelete({"_id": req.params.id})
    .then(data => res.json(data))
    .catch(next)
})

module.exports = router;