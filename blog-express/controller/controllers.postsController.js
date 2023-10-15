const { posts } = require("../models/models.posts");
const { v4 } = require('uuid');

function getPostList(req, res) {
    console.log(req.method, req.url);
    return res.json(posts);
}

function addPost(req, res) {
    const id = v4();
    const object = {
        id: id.toString(),
        title: req.body.title,
        body: req.body.body,
        createdAt: getTimeNow(),
        comments: []
    };
    posts.push(object);

    return res.json(object);
}

function editDeleteCommentPost(req, res) {
    const idLink = req.params.id;
    if (req.query.method === "edit") {
        const updatePostIndex = posts.findIndex((item) => item.id === idLink);
        const postById = posts[updatePostIndex];
        const object = {
            id: idLink,
            title: req.body.title,
            body: req.body.body,
            createdAt: postById.createdAt,
            comments: postById.comments
        }
        posts[updatePostIndex] = object
        return res.json(object);
    }
    else if (req.query.method === "delete") {
        const deletePostIndex = posts.findIndex((item) => item.id === idLink);
        posts.splice(deletePostIndex, 1);
        return res.json(posts);
    }
    else if (req.query.method === "comment") {
        const comment = req.body.comment
        const result = posts.find((item) => item.id === idLink)
        const date = new Date();
        const id = v4();
        const object = {
            id: id.toString(),
            body: comment,
            createdAt: getTimeNow()
        }
        result.comments.unshift(object)
            return res.json(object);
    }
}

function getPostById(req, res) {
    const id = req.params.id
    const result = posts.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result)
        res.json(result);
    else res.json({ error: "not valid" });
}

function getTimeNow() {
    const currentdate = new Date();
    return currentdate.getDate() + "/"
    + (currentdate.getMonth()+1)  + "/" 
    + currentdate.getFullYear() + " @ "  
    + currentdate.getHours() + ":"  
    + currentdate.getMinutes() + ":" 
    + currentdate.getSeconds();
}
module.exports = {
    getPostList,
    addPost,
    getPostById,
    editDeleteCommentPost
}