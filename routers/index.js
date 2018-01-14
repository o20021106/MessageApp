var express = require('express');
var path = require('path');
var router = express.Router();
var userController = require('../controllers/user.js');
var chatController = require('../controllers/chat.js');
var searchController = require('../controllers/search.js');
var config = require("../config/main")


router.get('/register', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../register.html'));

})
/*
router.get('/login', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../login.html'));

})
*/
router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '/../login.html'));
})

router.get('/authenticate', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../authentication.html'));

})

var passport = require('passport');  


router.get('/testing', passport.authenticate('jwt', { session: false,failureRedirect:'/login' }), function(req, res){
  console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});
router.get("/secrete", passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), function(req, res){

	console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});

router.get('/searchUser', passport.authenticate('jwt', {session: false ,failureRedirect:'/login'}), searchController.searchUser.get);
router.get('/getRecipients', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.getRecipients);
router.get('/getConversations', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.getConversations);
router.get('/getConversation/:conversationId', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.getConversation);
router.get('/getConversationByRecipientId/:recipientId', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.getConversationByRecipientId);

router.get('/recipient/:recipientId', passport.authenticate('jwt', { session: false , failureRedirect:'/login'}),chatController.chatLoad, chatController.message.get);

router.get('/message', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.message.get);


router.get('/editProfile', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), userController.editProfileTesting.get);

router.get('/', passport.authenticate('jwt', {failureRedirect:'/login',session: false }),function(req,res){
    res.redirect('https://'+req.headers.host+'/message')
})
router.post('/register',userController.register.post);
router.post('/editProfile', passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), userController.editProfile.post);

router.post('/login',userController.login.post);
router.post('/newMessage',passport.authenticate('jwt', { session: false ,failureRedirect:'/login'}), chatController.newConversation);
//router.post('/authenticate',userController.authenticate.post);

module.exports = router;