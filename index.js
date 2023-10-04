const express = require('express');
const { configViewEngine } = require("./configs/viewEngine");
const { initWebRoute } = require("./route/web");

const app = express();
const port = process.env.PORT || 5000;

configViewEngine(app);
initWebRoute(app);

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})