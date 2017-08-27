var blogPostModel = require('../src/models/blogPostModel');
var express = require('express');
var path = require('path');
var router = express.Router();
var userController = require('../controllers/user.js');


router.get('/', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../register.html'));

})

router.post('/login',userController.register.post);

module.exports = router;