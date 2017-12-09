var express = require ('express');
var index = require('./routers/index.js');
var api = require('./routers/api.js');
var app = express();
var path = require('path');
var DIST_DIR = path.join(__dirname,'dist/');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var config = require("./config/main.js")
var server = require('http').Server(app);
var io = require('socket.io')(server);



var morgan = require('morgan');  
var passport = require('passport');  
var jwt = require('jsonwebtoken');  


//const dbUrl = "mongodb://ipingou:mlab800203@ds153123.mlab.com:53123/ipingou";
const dbUrl = config.database;
mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error here:'));
db.once('open', function() {
  console.log('starting');
});

app.use(passport.initialize());  
require('./config/passport')(passport);  

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));  

app.use(validator());
app.use(express.static(DIST_DIR));
app.use('/api',api);
app.use('/',index);

server.listen(8000,function(){
	console.log('server is up');
});



var config = require("./config/main");
var socketioJwt = require('socketio-jwt');
var User = require('./src/models/user');  
var Conversation = require('./src/models/conversation');  
var chatControllerSocket = require('./controllers/chatSocket.js');



io.use(socketioJwt.authorize({
  secret: config.secret,
  handshake: true
}));

io.on('connection', function(client){
	console.log('in connection');
	User.findOne({email: client.decoded_token.email})
    .exec(function(err,user){
    	if (err){
    		console.log('error')
			return console.log(err);
		}

    	Conversation.find({participants: user._id})
    	.select('_id')
    	.exec(function(err, conversations){
    		conversations.forEach(function(conversation){
    			client.join(conversation._id);
    		}

    	});


	    client.on('sendMessage', function(data,fn){
	    	console.log('in sendMessage');
	    	console.log(user);
	    	console.log(data);
	    	chatControllerSocket.newMessage(user,data.recipient, data.composedMessage)
	    	.then(response => {
	    		console.log('in sendMessage response');
	    		console.log(response);
	    		fn(response);
	    	});
	    });

	    client.on('newMessage', function(data,fn){
	    	console.log('in newMessage');
	    	console.log(user);
	    	console.log(data);
	    	chatControllerSocket.newMessage(user,data.conversationId, data.composedMessage)
	    	.then(response => {
	    		console.log('in newMessage response');
	    		console.log(response);
	    		io.to(data.conversationId).emit('newMessage', {...data, author: user.name});
	    		fn(response);
	    	});
	    });

	    client.on('event', function(data,fn){
	  		console.log(data);
	  		fn('got it');
	  	});
  		client.on('disconnect', function(){});
  	}) 
});

/*
app.listen(8000,function(){
	console.log('server is up');
})
*/ 