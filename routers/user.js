var express = require('express');
var router = express.Router();
var userController = require('../controllers/user.js');

router.post('/login',userController.register.post);