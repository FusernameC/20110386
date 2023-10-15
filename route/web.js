const postsController = require("../controllers/controllers.postsController");
const express =  require("express");
let router = express.Router();

const initWebRoute = (app) => {
    router.get("/", postsController.getPostList);

    router.get("/:id", postsController.getPostById)

    router.post("/submit", postsController.addPost)

    router.post("/:id", postsController.editDeleteCommentPost)

    return app.use("/", router);
}

module.exports = { 
    initWebRoute
}