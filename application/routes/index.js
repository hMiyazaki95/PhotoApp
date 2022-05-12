var express = require('express');
var router = express.Router();
var isLoggedIn  = require('../middleware/routeprotectors').userIsLoggedIn;
var {getRecentPosts} = require('../middleware/postsmiddleware');


/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Hajime Miyazaki" });
  // res.render('index', {title: 'Express', name: "Hajime Miayzaki",tasks:
  //['coding', 'sleeping', 'eating' 'life'] })
});

router.get('/login', (req,res,next) => {
  res.render('login', {title: "Log In"});
})


router.get('/registration', (req,res,next) => {
  res.render('registration', {title:"Register"});
})

router.use('/postimage', isLoggedIn); // show only when users are logged in
router.get('/postimage', (req,res,next) => {
  res.render('postimage', {title:"Post Image"});
})

/*
router.get('/viewpost', (req,res,next) => {
  res.render('viewpost', {title: "View Post"});
})*/



module.exports = router;
