var db = require("../config/database");
//var PostModel = require("../models/Posts");
var PostModel = {};

PostModel.create = (title, description, photoPath, thumbnail, fk_userId) => {
    let baseSQL = `INSERT INTO posts (title, description, 
        photopath, thumbnail, createdAt, fk_userId) 
        VALUE (?,?,?,?, now(),?);;`;

        return db.query(baseSQL, 
            [title, 
            description, 
            photoPath, 
            thumbnail, 
            fk_userId
        ])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.search = (searchTerm) => {
    let baseSQL = `SELECT id, title, description, thumbnail, concat_ws(' ',
     title, description) AS haystack
     FROM posts HAVING haystack like ?;`;
     let sqlReadySearchTerm = "%" + searchTerm + "%";
     return db.query(baseSQL, [sqlReadySearchTerm])
     .then(([results, fields]) => {
         return Promise.resolve(results);
     })
     .catch((err) => Promise.reject(err));
};

PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL = `SELECT id, title, description, thumbnail, 
    createdAt FROM posts ORDER BY createdAt DESC LIMIT ?`;
    return db.query(baseSQL, [numberOfPost]).then(([results, fields]) => {
        return Promise.resolve(results);
    })
    .catch((err) => Promise.reject(err));
};


PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQL = 
        "SELECT id, title, description, thumbnail, createdAt FROM posts ORDER by createdAt DESC LIMIT ?";
        return db.execute(baseSQL, [numberOfPost]).then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => Promise.reject(err));
};

PostModel.getPostById = (postId) => { // postId in the video but maybe needs to be fixed
    let baseSQL =
    `SELECT u.username, p.title, p.description, p.photopath, p.createdAt 
    FROM users u 
    JOIN posts p 
    ON u.id = fk_userId 
    WHERE p.id=?;`;
  // maybe fk_userId or fk_userid
    
    return db.query(baseSQL,[postId]) // return is important in this 
    .then(([results, fields])=> {
      
        return Promise.resolve(results);
        
    })
    .catch(err => Promise.reject(err));
};

module.exports = PostModel;