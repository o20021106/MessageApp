var blogPostModel = require('../src/models/blogPostModel');
var express = require('express');
var path = require('path');
var router = express.Router();

router.get('/', function(req,res){

    blogPost = blogPostModel.find(function(err,blogPost){
        if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        //res.status(500).send(err)
        console.log(err);
        } else {
        // send the list of all people
        res.json(blogPost);
        }
    })
})



module.exports = router;