const PostModel = require("../models/Posts");

const { rawListeners } = require('../config/database');
const {getNRecentPosts, getPostById} = require('../models/Posts');
const {getCommentsForPost} = require('../models/Comments'); // getCommentForPost
const postMiddleware = {}


postMiddleware.getRecentPosts = async function(req, res, next) {
    try{
        let results = await PostModel.getNRecentPosts(16); // number of grip in the post
        res.locals.results = results;
        if(results.length == 0){
            req.flash(`error`, `There are no post created yet`);
        }
        next();
    }catch(err) {
        next(err)
    }
}

postMiddleware.getCommentByPostId = async function(req, res, next) {
    try {
        let postId = req.params.id;
        let results = await getPostById([post]);
        if(results && results.length){
            res.locals.currentPost = results[0];
            next();
        } else {
            req.flash("error", "This is nnot the post you are looking for. ");
            res.redirect('/');
        }
    } catch (error){
        next(err);
    }
    
}

    /* promise
    let baseSQL = 'SELECT id, title, description, thumbnail, createdAt FROM posts ORDER BY createdAt DESC LIMIT 8';
    db.query(baseSQL,[])
    .then(([results, fields])=>{
        //res.json(results)
        res.locals.results = results;
        if(results && results.length == 0){
            req.flash('error', 'THere are no posts created yet');
        }
        next();
    })
    .catch((err) => next(err));*/

postMiddleware.getPostById = async function(req, res, next){
    try{
        // attach the current post information. render to the res.locals object
        let postId = req.params.id;
        let results = await getPostById(postId);
        if(results && results.length){
            res.locals.currentPost = results[0];
            next();
        }else{
            req.flash("error", "This is not the post you are looking for.");
            res.redirect('/');
        }
    }catch (error){
        next(err);
    }
}
postMiddleware.getCommentsByPostId = async function(req, res, next) {
    let postId = req.params.id;
    try {
        let results = await getCommentsForPost(postId);
        res.locals.currentPost.comments = results;
        next();
    }catch (error){
        next(error);
    }
}

module.exports = postMiddleware;