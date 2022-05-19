// login.hbs has templates

var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcryptjs'); // for bcrypt
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserModel = require("../models/Users");
const UserError = require("../helpers/error/UserError");
const {registerValidator} = require('../middleware/validation');

/*GET home page. 

router.get('/', function(req, res, next) {
  res.render('index', { title: 'CSC 317 App', name:"Hajime Miyazaki",tasks:
  ['coding' , 'sleeping' , 'eating' , 'life'] }); // {context object}
}); */

// if you search http://localhost:3000/login
// middleware with the "/public" and "/users" doesn't  match 
// then '/' above doesn't match with the web address
// so that one below will be executed and show the blank page if nothing is
// in the login.hbs. if the login.hbs wasn't even exist then then the page
// throw error.
/*

/** this code is only for testing purpose
  // if you use this comment the usercreation code,
  res.json({ 
    message: "Valid user!!!"
  }); */
/*
router.get('/login', (req,res,next) => {
  res.render('login');
})*/
/*
router.get('/', function(req, res, next){
  res.send('respond with a resource');
});*/
// test route

//  you can do this below with many number of middleware function
// router.post("/register", registerValidator, registerValidator, registerValidator, registerValidator, registerValidator, (req, res, next) => {
//})

// res.redirect in routerprotectors.js will respond if the validation fail.
router.post("/register", registerValidator, (req, res, next) => {
  let username = req.body.uname;
  let email = req.body.em;
  let password = req.body.password;
  let repass = req.body.password;
  

  UserModel.usernameExists(username)
  .then((userDoesNameExist) => {
    if(userDoesNameExist){
      throw new UserError(
          "Registration Failed: Username already exist",
          "/registration",
          200 
      );
    }else{
      return UserModel.emailExists(email);
    }
  })
  .then((emailDoesExist) => {
    if(emailDoesExist){
      throw new UserError(
        "Registration Failed: Email already exist",
        "/registration",
        200 
      );
    }else{
      return UserModel.create(username, password, email);
    }
    })
    .then((createdUserId) => {
      if(createdUserId < 0){
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      }else{
        successPrint("User.js --> User was created!!"); // if user successfully created account then 
        req.flash('success', 'User account has been made!');
        res.redirect('/login'); // then redirect to the login page from registration page
      }
    }).catch((err) => {
      errorPrint("user could not be made", err)
      if(err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
        } else{
          next(err);
        }
    });
  



  // this code is only for testing purpose
  // if you use this comment the usercreation code,
  /*
  res.json({ 
    message: "Valid user!!!"
  });
    UserModel.usernameExists(username)
    .then((userDoesNameExist) => {
      if (userDoesNameExist){
        throw new UserError(
          "Registration Failed; Username already exists",
          "/registration",
          200
        );
      }else {
        return UserModel.emailExists(email);
      }
    })
    .then((emailDoesExist) => {
      if(emailDoesExist) {
        throw new UserError(
          "Registration Failed: Email already exists",
          "registration",
          200
        );
      }
    })
    */

    /**
     * do server side validation
     * not done in video must do on your own
     */

    
    /*
    console.log(req.body);
    res.send('data');
    */
    // try to grab one row from the data base


  /*
  db.query("SELECT * FROM csc317db.users WHERE username=?",[username]).then(([results, fields]) => { // use promiss way
      if(results && results.length == 0){
        return db.query("SELECT * FROM csc317db.users WHERE email=?", [email]);
      } else {
        throw new UserError(
          "Registration Failed: Username already exist",
          "/registration",
          200 
        );
      }
    })
    .then(([results, fields]) => {
      if(results && results.length == 0){
        // async version of hash
        // check the website to see how long hash takes on iteration (A Node on Rounds) 
        return bcrypt.hash(password, 15); 
      }else {
        throw new UserError(
          "Registration Failed: Email already exist",
          "/registration",
          200 
        );
      }
    })
    .then((hashedPassword) => {
      // sql statement
      let baseSQL = 
        "INSERT INTO users (username, email, password, createdAt) VALUES (?,?,?,now());";
      return db.query(baseSQL,[username, email, hashedPassword]);
    })
    .then(([results, fields]) => {
      if(results && results.affectedRows){
        successPrint("User.js --> User was created!!"); // if user successfully created account then 
        req.flash('success', 'User account has been made!');
        res.redirect('/login'); // then redirect to the login page from registration page
      }else{
        throw new UserError(
          "Server Error, user could not be created",
          "/registration",
          500
        );
      }
    })
    .catch((err) => {
      errorPrint("user could not be made", err)
      if(err instanceof UserError) {
        errorPrint(err.getMessage());
        req.flash('error', err.getMessages());
        res.status(err.getStatus());
        res.redirect(err.getRedirectURL());
        }else{
          next(err);
        }
    });*/
});   




/*for testing
router.post('/login', (req, res, next) => {
  console.log('route reached');
  res.send('data');

})*/

// for testing
/*router.post('/postimage', (req, res, next) => {
    console.log('route reached');
    res.send('data');
  
})*/

// Log in
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  //console.log(req.body);
  //res.send(req.body);

  // instead of the ',' I used AND in the sql syntax then worked
  // deleted for the Refactoring User
  /*
  let baseSQL = "SELECT id, username, password FROM users WHERE username=?;";
  let userId;
  db.query(baseSQL, [username])
  .then(([results, fields]) => {
    if(results && results.length == 1){
      let hashedPassword = results[0].password;
      userId = results[0].id;
      return bcrypt.compare(password, hashedPassword);
      
      //res.cookie("logged",username, {expires: new Date(Date.now()+900000), httpOnly: 
      //false});
      //res.cookie("isLogged", "true" ,username, {expires: new Date(Date.now()+900000), httpOnly: 
      //false});
      //res.redirect('/');
      
    } else{
      throw new UserError("invalid username and/or password!", "/login", 200);
    }
  })*/
  UserModel.authenticate(username,password)
  .then((loggedUserId) => {
    if (loggedUserId > 0) {
      successPrint(`User ${username} is logged in`);
      req.session.username = username;
      req.session.userId = loggedUserId;
      res.locals.logged = true;
      req.flash("success", "You have been successfully Logged in!");
      res.redirect("/");
    } else {
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  .catch((err) => {
    errorPrint("user login failed");
    if(err instanceof UserError){
      errorPrint(err.getMessage());
      req.flash('error', err.getMessage());
      res.status(err.getStatus());
      res.redirect('/login'); // if any error refresh the login page
    }else{
      next(err);
    }
  });
});


  /*
  // description is in the website bycrypt.compare password
  // true and false will be result
  .then((loggedUserId) => {
    if(loggedUserId){
      successPrint(`User ${username} is logged in`);
      req.session.username = username; // create sessions for username
      req.session.userId = userId; // create sessions for id
      res.locals.logged = true;
      req.flash('success','You have been successfully Logged in');
      res.redirect("/"); // redirect to the main page (index)
      /*
      req.session.save( function (err) {
        res.redirect("/"); // redirect to the main page (index)
      });
      
    }else{
      throw new UserError("Invalid username and/or password!", "/login", 200);
    }
  })
  
  .catch((err) => {
      errorPrint("user login failed");
      if(err instanceof UserError){
        errorPrint(err.getMessage());
        req.flash('error', err.getMessage());
        res.status(err.getStatus());
        res.redirect('/login'); // if any error refresh the login page
      }else{
        next(err);
      }
  });
});*/

 // logout
 router.post('/logout', (req, res,next) => {
   req.session.destroy((err) => {
    if(err){
      errorPrint('session could not be destroyed.');
      next(err);
    }else{
      successPrint('Session was destroyed');
      res.clearCookies('csid');
      res.json({status:"OK",  message:"user is logged out"});
    }
    });
  });






module.exports = router;

