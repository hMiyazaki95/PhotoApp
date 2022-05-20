var express = require("express");
var router = express.Router();
const {successPrint, errorPrint} = require("../helpers/debug/debugprinters");
const { create } = require('../models/Comments');

router.post('/create', (req, res, next) => {
    //console.log(req.body);
    //res.json("We got your comment");
    
    if(!req.session.username){
        errorPrint("must be logged in to comment");
        res.json({
            code: -1,
            status: "danger",
            message: "Must be logged in to create a comment"

        });

    }else{
    let { comment, postId } = req.body;
    //let username = 'Hajime2';// this is for test
    let username = req.session.username;
    //let userId = 18; // this  is for test
    let userId = req.session.userId;
    
    create(userId, postId, comment)
    .then((wasSuccessful) => {
        if(wasSuccessful !== -1){
            successPrint(`comment was created for ${username}`);
            res.json({
                code: 1,
                status:"success",
                message: "comment create",
                comment: comment,
                username: username,
            });
        }else{ // fails create
            errorPrint('comment was not saved');
            res.json({
                code: -1,
                status: "danger",
                message:"comment was not created",
            });
        }
    })
    .catch((err) => next(err))
    }   
});

module.exports = router;