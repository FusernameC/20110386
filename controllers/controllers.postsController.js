const { posts } = require("../models/models.posts");
const { v4 } = require('uuid');
function getPostList(req, res) {
    console.log(req.method, req.url);
    return res.render("index.hbs", { posts: posts });
}

function addPost(req, res) {
    const id = v4();
    posts.push({
        id: id.toString(),
        title: req.body.title,
        body: req.body.body,
        createdAt: getTimeNow(),
        comments: []
    });

    res.redirect(303, '/')
}

function editDeleteCommentPost(req, res) {
    const idLink = req.params.id;
    if (req.query.method === "edit") {
        const updatePostIndex = posts.findIndex((item) => item.id === idLink);
        const postById = posts[updatePostIndex];
        posts[updatePostIndex] = {
            id: idLink,
            title: req.body.title,
            body: req.body.body,
            createdAt: postById.createdAt,
            comments: postById.comments
        }
        res.redirect(303, `/${idLink}`)
    }
    else if (req.query.method === "delete") {
        const deletePostIndex = posts.findIndex((item) => item.id === idLink);
        posts.splice(deletePostIndex, 1);
        res.redirect(303, `/`)
    }
    else if (req.query.method === "comment") {
        const comment = req.body.comment
        const result = posts.find((item) => item.id === idLink)
        const date = new Date();
        const id = v4();
        result.comments.unshift(
            {
                id: id.toString(),
                body: comment,
                createdAt: getTimeNow()
            })
        res.redirect(303, `/${idLink}`)
    }
}

function getPostById(req, res) {
    const id = req.params.id
    const result = posts.find((item) => item.id === id)
    console.log(req.method, req.url);
    if (result)
        res.render("postDetail.hbs", result);
    else res.json({ error: "not valid" });
}

function addComments(req, res) {

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