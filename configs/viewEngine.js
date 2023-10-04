const express = require("express");
const bodyParser = require('body-parser')

function configViewEngine(app) {
    app.use(express.static('./public'))
    app.set('view engine', '.hbs');
    app.use(bodyParser.urlencoded({ extended: false }))
    app.set("views", "./views")
}

module.exports = {
    configViewEngine
}