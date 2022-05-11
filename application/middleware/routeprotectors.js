// protect your route from the type of users
const { successPrint, errorPrint } = require("../helpers/debug/debugprinters");
const routeProtectors = {};


// express-recv-request -> mw1 -> mw2 -> mw3 -> ... -> mwN -> router.HTTPVERB
routeProtectors.userIsLoggedIn = function(req, res, next){
    if(req.session.username){
        successPrint('User is logged in');
        next();
    }else{
        errorPrint('user is not logged in!');
        req.flash('error', 'You must be logged in to crete a Post!');
        res.redirect('/login');
    }
}

module.exports = routeProtectors;