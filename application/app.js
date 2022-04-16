// order of middleware is important


const createError = require("http-errors");
const express = require("express");
const favicon = require('serve-favicon');
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const handlebars = require("express-handlebars");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
//successPrint->/debug/debugprinters.js
//errorPrint, successPrint 
const{ requestPrint} = require('./helpers/debug/debugprinters');
//var app = express();

// handlebars template engine
const app = express();

app.engine(
  "hbs",
  handlebars({
    layoutsDir: path.join(__dirname, "views/layouts"), //where to look for layouts
    partialsDir: path.join(__dirname, "views/partials"), // where to look for partials
    extname: ".hbs", //expected file extension for handlebars files
    defaultLayout: "layout", //default layout for app, general template for all pages in app
    helpers: {}, //adding new helpers to handlebars for extra functionality
  })
);

// ORDER which define these middleware Does Matter !!!!
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// "use" is middleware function 
//sample url localhost:3000/help
// incoming request irq --> mw1 --> mw2 --mw3 --> mwN --> .get() or .post() https object
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//serving static asset application
//app.use("/public". express.static(path.join(__dirname,"public")));
app.use(favicon(__dirname + '/public/favicon.ico'));
app.use("/public", express.static(path.join(__dirname, "public")));

app.use("/", indexRouter); // route middleware from ./routes/index.js
app.use("/users", usersRouter); // route middleware from ./routes/users.js

/**
 * Catch all route, if we get to here then the 
 * resource requested could not be found.
 * 
 * 
 */
// if I add this method in the 
app.use((req,res,next) => {
  //how to pass data into middleware 2 from middleware 1 is by using 
  //"next()" without parameter

  // if you  use next(new Error('something bad happened'));
  // this triggers function below app.use(function (err, req, res, next)
  // will be executed (can use this anywhere in my function to show the error message)
  next(createError(404, `The route ${req.method} : ${req.url} does not exist.`));
  //console.log(x); it helps when you debug
  /*console.log(`Method ${req.method}, Route: ${req.erl}`);
  next();*/
})
  

/**
 * Error Handler, used to render the error html file
 * with relevant error information.
 * always at the  end
 * 
 */
app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = err;
  // can change the color from the debugprinters.js
  //errorPrint('User can not be made!');
  //errorPrint(err);
  //console.log(err);
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;