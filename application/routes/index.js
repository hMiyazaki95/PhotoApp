var express = require('express');
var router = express.Router();
var isLoggedIn  = require('../middleware/routeprotectors').userIsLoggedIn;
const {getRecentPosts, getPostById, getCommentsByPostId} = require('../middleware/postsmiddleware'); // it might need to be changed
var db = require("../config/database");

//const PostModel = require('../models/Posts');


/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Hajime Miyazaki" });
  // res.render('index', {title: 'Express', name: "Hajime Miayzaki",tasks:
  //['coding', 'sleeping', 'eating' 'life'] })
});

router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
});


router.get('/registration', (req,res,next) => {
  res.render('registration', {title:"Register"});
});

router.use('/postimage', isLoggedIn); // show only when users are logged in
router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title:"Post Image"});
});

// don't write middleware like getPostById() 
//post/id
router.get("/posts/:id(\\d+)", getPostById, getCommentsByPostId, (req,res,next) => {
  res.render("imagepost", {title: `Post ${req.params.id}` });
});

/*
router.get('/post/:id\\d+', (req,res,next) => {
  res.send({params:req.params.id});
});
*/
/*
router.get('/post/help', (req,res,next) => {
  res.send({literal: "literal help"});
});
*/
/*
router.get('/imagepost', (req,res,next) => {
  res.render('imagepost', {title: "View Post"});
})*/



module.exports = router;
