var express = require('express');
var router = express.Router();
var isLoggedIn  = require('../middleware/routeprotectors').userIsLoggedIn;
var {getRecentPosts} = require('../middleware/postsmiddleware'); // it might need to be changed
var db = require("../config/database");


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

router.get("/posts/:id(\\d+)", (req,res,next) => {
  let baseSQL =
  `SELECT u.username, p.title, p.description, p.photopath, p.createdAt 
  FROM users u 
  JOIN posts p 
  ON u.id=fk_userId 
  WHERE p.id=?;`;

  let postId = req.params.id;

  db.query(baseSQL,[postId])
  .then(([results, fields])=> {
    if(results && results.length){
      let post = results[0];
      res.render('imagepost', {currentPost: post});
    }else{
      req.flash('error', 'This is not the post you are looking for!');
      res.redirect('/');
    }
  })
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
