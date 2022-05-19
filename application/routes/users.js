// login.hbs has templates

var express = require('express');
var router = express.Router();
var db = require('../config/database');
var bcrypt = require('bcryptjs'); // for bcrypt
const { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
const UserModel = require("../models/Users");
const UserError = require("../helpers/error/UserError");
const {registerValidator} = require('../middleware/validation');

//GET home page. 

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
});   



// Log in
router.post('/login', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

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

