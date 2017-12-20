var blogPostModel = require('../src/models/blogPostModel');
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
router.get('/login', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../login.html'));

})

router.get('/authenticate', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../authentication.html'));

})

/*
router.post('/authenticate', function(req, res) {  
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.send({ success: false, message: 'Authentication failed. User not found.' });
    } else {
      // Check if password matches
      user.comparePassword(req.body.password, function(err, isMatch) {
        if (isMatch && !err) {
        	console.log("match!");
          // Create token if the password matched and no error was thrown
          var token = jwt.sign(user.toObject(), config.secret, {
            expiresIn: 10080 // in seconds
          });
          res.json({ success: true, token: 'JWT ' + token });
        } else {
          res.send({ success: false, message: 'Authentication failed. Passwords did not match.' });
        }
      });
    }
  });
});
*/
var passport = require('passport');  
/*router.get("/secrete",function(req,res){
	console.log(req.headers.authorization); 
	res.json({token: "here"});
});
*/


router.get('/testing', passport.authenticate('jwt', { session: false }), function(req, res){
  console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});
router.get("/secrete", passport.authenticate('jwt', { session: false }), function(req, res){

	console.log(req.user.email);
  res.json("Success! You can not see this without a token");
});

router.get('/searchUser', passport.authenticate('jwt', { session: false }), searchController.searchUser.get);
router.get('/getRecipients', passport.authenticate('jwt', { session: false }), chatController.getRecipients);
router.get('/getConversations', passport.authenticate('jwt', { session: false }), chatController.getConversations);
router.get('/getConversation/:conversationId', passport.authenticate('jwt', { session: false }), chatController.getConversation);
router.get('/getConversationByRecipientId/:recipientId', passport.authenticate('jwt', { session: false }), chatController.getConversationByRecipientId);
router.get('/recipient/:recipientId', passport.authenticate('jwt', { session: false }),chatController.chatLoad);
/*
router.get('/recipient/:recipientId', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../index.html'));

})
*/
router.get('/message', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.sendFile(path.join(__dirname, '/../index.html'));

})
router.get('/', function(req,res){
    //res.sendFile(path.join(__dirname, '/../index.html'));
    res.redirect('/message')
})
router.post('/register',userController.register.post);

router.post('/login',userController.login.post);
router.post('/newMessage',passport.authenticate('jwt', { session: false }), chatController.newConversation);
//router.post('/authenticate',userController.authenticate.post);

module.exports = router;