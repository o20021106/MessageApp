var express = require ('express');
var index = require('./routers/index.js');
var app = express();
var path = require('path');
var DIST_DIR = path.join(__dirname,'dist/');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var validator = require('express-validator');
var config = require("./config/main.js")
var server = require('http').Server(app);
var io = require('socket.io')(server);
//var redis   = require("redis");
//var session = require('express-session');
//var redisStore = require('connect-redis')(session);
//var redisClient  = redis.createClient();
var morgan = require('morgan');  
var passport = require('passport');  
var jwt = require('jsonwebtoken');  
var cookieParser = require('cookie-parser');
var config = require("./config/main");
var Datauri = require('datauri');
const PORT = process.env.PORT || 8000;

const dbUrl = config.database;
mongoose.connect(dbUrl);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error here:'));
db.once('open', function() {
  console.log('starting');
});

/*
app.use(session({
    secret: config.sessionSecret,
    store: new redisStore({ host: 'localhost', port: 6379, client: redisClient,ttl :  1000}),
    saveUninitialized: false,
    resave: false
}));


app.get('/testLogout',function(req,res){
    req.session.destroy(function(err){
        if(err){
            console.log(err);
        } else {
            res.json({ms:'logout'});
        }
    });
});
*/


app.use(cookieParser());
app.use(passport.initialize());  
require('./config/passport')(passport);  
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));  
app.use(validator());
app.use(express.static(DIST_DIR));
app.use(express.static(path.join(__dirname,'fontawesome-free-5.0.2/')));
app.use('/',index);

server.listen(PORT,function(){
	console.log('server is up, and listening on port '+PORT);
});



var socketioJwt = require('socketio-jwt');
var User = require('./src/models/user');  
var Conversation = require('./src/models/conversation');  
var chatControllerSocket = require('./controllers/chatSocket.js');
var clients = {} //key: userId  value: socket id



io.use(socketioJwt.authorize({
  secret: config.secret,
  handshake: true
}));

io.on('connection', function(client){
	console.log('in connection');
	User.findOne({_id: client.decoded_token.id})
    .exec(function(err,user){
    	if (err){ 
    		console.log('error')
			return console.log(err);
		} 
		console.log(user.name);
        clients[user._id] = client.id;


    	Conversation.find({participants: user._id})
    	.select('_id')
    	.exec(function(err, conversations){
    		conversations.forEach(function(conversation){
    			console.log('join '+conversation._id);
    			client.join(conversation._id);
    		})

    	});


	    client.on('sendMessage', function(data,fn){
	    	chatControllerSocket.newMessage(user,data.recipient, data.composedMessage)
	    	.then(response => {
	    		fn(response);
	    	});
	    }); 

	    client.on('newMessage', function(data,fn){
	    	chatControllerSocket.newMessage(user,data.conversationId, data.composedMessage)
	    	.then(response => {
	    		io.to(data.conversationId).emit('newMessage', {message: response.message, chosenId:[data.recipientId, user._id], conversationType: data.conversationType});
	    		fn(response.status);
	    	});
	    });

	    client.on('newConversation', function(data,fn){
	    	chatControllerSocket.newConversation(user, data.recipientId, data.composedMessage)
	    	.then(response =>{
	    		console.log('new conversation!!!!!!!!!!!!!!!!!!')
	    		console.log(data.recipientId);
	    		console.log(clients);
	    		client.join(response.conversation._id);
	    		if(data.recipientId in clients){
	    			io.sockets.connected[clients[data.recipientId]].join(response.conversation._id);
	    		}
	    		io.to(response.conversation._id).emit('NEW_CONVERSATION', 
	    				{payload: response,chosenId:[data.recipientId, user._id], conversationType: data.conversationType});
	    		fn({type: 'NOTHING'});
	    	}); 

	    }); 
	    client.on('event', function(data,fn){
	  		console.log(data);
	  		fn('got it');
	  	});
  		client.on('disconnect', function(){
  			if (user._id in clients){
  				delete clients[user._id]
  			}
  		});
  	}) 
});
