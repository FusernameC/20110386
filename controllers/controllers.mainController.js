const {mygroup} = require('../models/models.mygroup');

function mainHandler(req, res)
{
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(mygroup));
}

module.exports = {
    mainHandler
}