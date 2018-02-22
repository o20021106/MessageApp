var express = require('express');
var path = require('path');
var router = express.Router();
var userController = require('../controllers/user.js');
var chatController = require('../controllers/chat.js');
var messageController = require('../controllers/message.js');
var nearbyController = require('../controllers/nearby.js');

var searchController = require('../controllers/search.js');
var config = require("../config/main");
const PORT = process.env.PORT || 6000;

const hostname = process.env.host || `localhost:${PORT}/`;
const hostRe = 'https://'+hostname;

/*
router.get('/register', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../register.html'));

})
*/

/*
router.get('/login', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../login.html'));

})
*/
/*
router.get('/login', function(req,res){
    res.sendFile(path.join(__dirname, '/../login.html'));
})
*/
router.get('/authenticate', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../authentication.html'));

})

var passport = require('passport');  


router.get('/testing', passport.authenticate('jwt', { session: false,failureRedirect:hostRe+'registerLogin' }), function(req, res){
  console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});
router.get("/secrete", passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), function(req, res){

	console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});

router.get('/searchUser', passport.authenticate('jwt', {session: false ,failureRedirect:hostRe+'registerLogin'}), searchController.searchUser.get);
router.get('/getNEarbyUsers', passport.authenticate('jwt', {session: false ,failureRedirect:hostRe+'registerLogin'}), searchController.getNearbyUsers.get);
router.get('/getRecipients', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.getRecipients);
router.get('/getConversations', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.getConversations);
router.get('/getConversation/:conversationId', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.getConversation);
router.get('/getConversationByRecipientId/:recipientId', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.getConversationByRecipientId);

router.get('/recipient/:recipientId', passport.authenticate('jwt', { session: false , failureRedirect:hostRe+'registerLogin'}),chatController.chatLoad, chatController.message.get);

//router.get('/message', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.message.get);


router.get('/editProfile', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), userController.editProfileTesting.get);
router.get('/registerLogin', function(req,res){
    res.sendFile(path.join(__dirname, '/../registerLogin.html'));
})

router.get('/message/*', passport.authenticate('jwt', {failureRedirect:hostRe+'registerLogin',session: false }), messageController.message.get);
router.get('/nearby', passport.authenticate('jwt', {failureRedirect:hostRe+'registerLogin',session: false }), nearbyController.nearby.get);

router.get('/', passport.authenticate('jwt', {failureRedirect:hostRe+'registerLogin',session: false }),function(req,res){
    res.redirect('https://'+req.headers.host+'/message/messages')
})


router.post('/register',userController.register.post);
router.post('/editProfile', passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), userController.editProfile.post);

router.post('/login',userController.login.post );
router.post('/newMessage',passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), chatController.newConversation);
router.post('/updateGeolocation',passport.authenticate('jwt', { session: false ,failureRedirect:hostRe+'registerLogin'}), userController.updateGeolocation);

module.exports = router;