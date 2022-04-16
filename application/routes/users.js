// login.hbs has templates

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Hajime Miyazaki",tasks:
  ['coding' , 'sleeping' , 'eating' , 'life'] }); // {context object}
});

// if you search http://localhost:3000/login
// middleware with the "/public" and "/users" doesn't  match 
// then '/' above doesn't match with the web address
// so that one below will be executed and show the blank page if nothing is
// in the login.hbs. if the login.hbs wasn't even exist then then the page
// throw error.
router.get('/login', (req,res,next) => {
  res.render('login');
})

module.exports = router;
