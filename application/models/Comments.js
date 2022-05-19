var db = require("../config/database");
const CommentModel = {};

CommentModel.create = (userId, postId, comment) => {
    //same as this in SQL File. INSERT INTO `csc317db`.`comments` (`comment`,`fk_authorid`, `fk_postid`) VALUES (?,?,?);
    let baseSQL = `INSERT INTO comments (comment, fk_postid, fk_authorid) VALUES (?,?,?);`
    return db
    .query(baseSQL, [comment, postId, userId])
    .then(([results, fields]) => {
        if(results && results.affectedRows){
                Promise.resolve(results.insertId);
        }else{
            return Promise.resolve(-1);
        }
    }).catch((err) => Promise.reject(err));
}

CommentModel.getCommentsForPost = (postId) => {
    // relay on post // use join
    // c and u is alias
    let baseSQL = `SELECT u.username, c.comment, c.createdAt, c.id
    FROM comments c
    JOIN users u
    on u.id=fk_authorid
    WHERE c.fk_postid=?
    ORDER BY c.createdAt DESC`;
    return db.query(baseSQL, [postId])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        }).catch(err => Promise.reject(err));
};

module.exports = CommentModel;