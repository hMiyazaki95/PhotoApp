var db = require("../config/database");
const postMiddleware = {}

postMiddleware.getRecentPosts = function(req, res, next) {
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
    .catch((err) => next(err));
}

module.exports = postMiddleware;