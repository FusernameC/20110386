const {mygroup} = require('../models/models.mygroup');

function getHandler(req, res, studentID, id) 
{
  const member = mygroup.find((member) => member.id === studentID);
  if (member) {
    if (id) {
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(member));
    } else {
      res.setHeader('Content-Type', 'text/html');
      const html = `<html><body><ul><li>${member.name}</li></ul></body></html>`;
      res.end(html);
    }
  } else {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Not valid' }));
  }
}

function postHandler(req, res, studentID) 
{
  let body = '';
  req.on('data', (data) => {
    body += data.toString();
  });
  req.on('end', () => {
    const newStudent = JSON.parse(body);
    if ((newStudent.id === studentID && !mygroup.find((member) => member.id === studentID))
      &&((newStudent.id === '20110415' && newStudent.name === 'Vu Hoang Truc Vy')
      ||(newStudent.id === '20110371' && newStudent.name === 'Nguyen Van Hon')))
    {
      mygroup.push(newStudent);
      res.end(JSON.stringify(newStudent));
    } else {
      res.end('Not valid');
    }
  });
}

module.exports = {
    getHandler,
    postHandler
}