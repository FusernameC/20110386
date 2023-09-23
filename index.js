const express = require('express');
const app = express();
const PORT = 5000;

const {getHandler, postHandler} = require('./controllers/controllers.studentIdController');
const {mainHandler} = require('./controllers/controllers.mainController');
const message = require('./routes/routes.message');

app.use(express.json());


//Handling endpoint "/", GET method
app.get('/', function(req, res){
    mainHandler(req, res);
    console.log(req.method + " " + req.url);
});

//Handling endpoint "/<Student ID>/<ID>", GET method
app.get('/:studentID/:ID', function(req, res){
    const [studentID, ID] = [req.params.studentID, req.params.ID];
    getHandler(req, res, studentID, ID);
    console.log(req.method + " " + req.url);
});

//Handling endpoint "/<Student ID>/<ID>", POST method
app.post('/:studentID/:ID', function(req, res){
    const [studentID, ID] = [req.params.studentID, req.params.ID];
    postHandler(req, res, studentID);
    console.log(req.method + " " + req.url);
});

//Handling endpoint "/message/<ID>"
app.use('/message', message);

app.listen(PORT);