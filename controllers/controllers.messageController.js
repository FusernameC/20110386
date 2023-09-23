const {mygroup} = require('../models/models.mygroup');

function messageHandler(req, res, id) 
{
  if (!id) {
    const names = mygroup.map((member) => member.name);
    res.setHeader('Content-Type', 'text/html');
    const html = `<html><body><ul>${names.map((name) => `<li>${name}</li>`).join('')}</ul></body></html>`;
    res.end(html);
  } else {
    const member = mygroup.find((member) => member.id === id);
    if (member) {
      res.setHeader('Content-Type', 'text/html');
      const html = `<html><body><ul><li>${member.name}</li></ul></body></html>`;
      res.end(html);
    } else {
      res.end('Not valid');
    }
  }
}

module.exports = {
    messageHandler
}