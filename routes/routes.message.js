const express = require('express');
const {messageController} = require('../controllers/controllers.messageController');
const router = express.Router();

//Handling endpoint "/message/<ID>", GET method
router.get('/:ID', function(req, res){
  const ID = req.params.ID;
  messageController(req, res, ID);
  console.log(req.method + " " + req.url);
});

//Handling endpoint "/message/<ID>", other method
router.all('/:ID', function(req, res){
  if (req.method === 'GET') return next();
  res.end('Not valid');
  console.log(req.method + " " + req.url);
});


module.exports = router