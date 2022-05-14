var express = require('express');
var router = express.Router();
var db = require('../config/database');
var { successPrint, errorPrint } = require('../helpers/debug/debugprinters');
var sharp = require('sharp');
var multer = require('multer');
var crypto = require('crypto'); 
var PostError  = require('../helpers/error/PostError');
const { response } = require('express');

var storage = multer.diskStorage({
    destination: function(req, file, cb){ // call distination which defin
        //middleware /public in app.js matches to this below 
        cb(null, "public/images/uploads");

    },
    filename: function(req, file, cb) {
        let fileExt = file.mimetype.split('/')[1];
        let randomName = crypto.randomBytes(22).toString("hex");
        cb(null, `${randomName}.${fileExt}`);
    }
});


var uploader = multer({storage: storage});



router.post('/createPost', uploader.single("uploadImage"),(req, res, next) => {
    let fileUploaded = req.file.path;
    let fileAsThumbnail = `thumbnail-${req.file.filename}`;
    let destinationOfThumbnail = req.file.destination + "/" + fileAsThumbnail;
    let title = req.body.title;
    let description = req.body.description;
    let fk_userId = req.session.userId;
    /**
     * do server validation on your own not do in 
     * video must do on your own
     * if any values that used for the inssert statement 
     * are undefined, mysql.query or execute will fail
     * BINO parameters cannot  be undefined 
     */





    sharp(fileUploaded)
    .resize(200)
    .toFile(destinationOfThumbnail)
    .then(() => {
        let baseSQL = `INSERT INTO posts (title, description, photopath, thumbnail, createdAt, fk_userId) VALUE (?,?,?,?, now(),?);;`;

        return db.execute(baseSQL,[title, description, fileUploaded, destinationOfThumbnail, fk_userId]);
    })
    .then(([results, fields]) => {
        if(results && results.affectedRows){
            req.flash('success', "Your post was created successfully");
            //res.redirect('/');
            res.json({status: "OK", message:"post was created", "redirect": "/"});
        }else{
            //throw new PostError('Post could not be created!1', '/postimage', 200);
            resp.json({status: "OK", message:"post was not created", "redirect": "/postimage"});
        }   
    })
    .catch((err) => {
        if(err instanceof PostError){
            errorPrint(err.getMessage());
            req.flash('error', err.getMessage());
            res.status(err.getStatus());
            res.redirect(err.getRedirectURL());
        }else{
            response.json();
            //next(err);
        }
    });
});




/*
router.post('/createPost', uploader.single("uploadImage"),(req, res, next) => {
    console.log(req);
    res.send('');
});*/

//localhost:3000/posts/search?search=value // you ca encrypt this 
// belows are async
router.get('/search', async (req, res, next) => {
    try{
    let searchTerm = req.query.search;
    if(!searchTerm){
        //res.send(req.params)
        res.send({
            resultsStatus: "info",
            message:"No search term given",
            results: []

        });
    }else{
        let baseSQL = `SELECT id, title, description, thumbnail, concat_ws('', title,
        description) AS haystack
        FROM posts
        HAVING haystack like ?;`;
        let sqlReadySearchTerm = "%" + searchTerm + "%";
        let [results, fields] = await db.query(baseSQL, [sqlReadySearchTerm]);
        if(results && results.length){
            res.send({
                resultsStatus:"info",
                message: `${results.length} results found`,
                results: results
            });
        }else{
                // if we don't have data
                // ` or '?
                // this code coming from the postsmiddleware.js
            let [results, fields] = await db.query(`SELECT id, title, description, thumbnail, createdAt FROM posts 
            ORDER BY createdAt DESC LIMIT 8`,[]);
            
                res.send({
                    resultsStatus:"info",
                    message: "No results where found for your search but here are the 8 \
                    most recent posts",
                    results: results,
                });
            } 
        }
    }catch (err){
        next(err)
    }
});
/* async function sync
async function test(){
    try{
        async events
    }catch (err){
        // handle err
    }
}*/

module.exports = router;