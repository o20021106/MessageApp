const Conversation = require("../src/models/conversation"),
		Message = require("../src/models/message"),
		User = require("../src/models/user");
var path = require('path');


var Promise = require ('promise');


exports.chatLoad = function(req,res,next){
	User.findOne({_id:req.params.recipientId})
	.exec(function(err,recipient){
		console.log('chatload');
		if(err){
			console.log('chatload err');
			console.log(err);
			Conversation.findOne({$and: [{participants: {$in:[req.user._id]}}, {participants: {$size :2} }]})
			.sort({ createdAt : -1})
			.limit(1)
			.exec(function(err, conversation){
				if(err){
					return res.json({error: err})
				}

				if(conversation){
					var recipient = conversation.participants.filter(function(participant){
						return String(participant) !== String(req.user._id)}
						);
					return res.redirect('/recipient/'+recipient);
				}
				else{
					return res.redirect('/message');
				}
			})
		}else{
			if(recipient){
				console.log('recipient found');
				return next();
			}
			else{
				console.log('recipient not found');
				Conversation.findOne({$and: [{participants: {$in:req.user._id}}, {participants: {$size :2} }]})
				.sort({ createdAt : -1})
				.limit(1)
				.exec(function(err, conversation){
					if(err){
						console.log('err3');
						return res.json({error, err})
					}

					if(conversation){

						console.log('existing conversation2');

						var recipient = conversation.participants.filter(function(participant){

							return String(participant) !== String(req.user._id)}
							);
						return res.redirect('/recipient/'+recipient);

					}
					else{
						return res.redirect('/');
					}
				})			
			}
		}
	})
}

exports.getRecipients = function(req, res, next){
	User.find({})
	.select('_id name')
	.exec(function(err,users){
		if (err){
			res.json({err:err});
			return next(err);
		}
		var userConversations = []
		users.forEach(function(user){
			console.log('in recipient user');
			Conversation.findOne({$and: [{participants: {$all:[req.user._id, user._id]}}, {participants: {$size :2} }]})
			.select('_id')
			.exec(function(err, conversation){
				console.log('in recipient user2');

				if(err){
					console.log('in recipient user3');

					return res.json({error:err});
				}
				var userTemp = {_id:user._id, name: user.name};

				if(conversation){
					userTemp.conversationId= conversation._id;				
				}
				userConversations.push(userTemp);

				if(userConversations.length === users.length){
              		return res.status(200).json({ users: userConversations});
				}
			})
		})
	})
}

exports.getConversationByRecipientId = function(req,res,next){
	console.log(' in getConversationByRecipeintId');
	Conversation.findOne({$and: [{participants: {$all:[req.user._id, req.params.recipientId]}}, {participants: {$size :2} }]},function(err,conversation){
		if(err){
			return res.json({error:err})
		}
		if(!conversation){
			return res.status(200).json({status: 'noConversation'})
		}
		Conversation.populate(conversation,{path:'participants',select:'name _id avatarURL'}, function(err, populatedConversation){
			
			if (err){
				console.log(err);
				return json({error:err});
			}
			var messages = getConversation1(conversation._id);
			messages.then(response=>{
			return res.status(200).json({'message': response.messages, 'conversation': populatedConversation})
		})
		});
	})

}

exports.getConversations = function(req, res, next){
    console.log('in getconversations here');
	Conversation.find({participants: req.user._id})
	.select('_id participants')
	.populate('participants','name avatarURL')
	.exec(function(err,conversations){
		if (err){
			console.log('conv err');
			console.log(err);
			res.json({err:err});
			return next(err);
		}
		else if (conversations.length === 0) {
		    return res.status(200).json({ conversations: [] });
		}
		let allConversations = [];
		conversations.forEach(function(conversation){
			Message.find({conversationId: conversation._id})
			.sort('-createdAt')
			.limit(1)
			.populate('author', 'name _id')
			.exec(function(err, message){
				if (err){
					console.log('conv2 err');
					console.log(err);
					res.json({err:err});
					return next(err);
				}
				allConversations.push({'message': message, 'conversation': conversation});
				if(allConversations.length === conversations.length) {
              		return res.status(200).json({ conversations: allConversations });
            	}

			})
		})

	})
}



exports.getConversationsPre = function(req, resolve, reject){
    console.log('in getconversations here');
	Conversation.find({participants: req.user._id})
	.select('_id participants')
	.populate('participants','name avatarURL')
	.exec(function(err,conversations){
		if (err){
			console.log('conv err!!!!!!!!!!!!!!');
			console.log(err);
			return reject(1);
		}
		else if (conversations.length === 0) {
		    return resolve({ conversations: [] });
		}

		let allConversations = [];
		conversations.forEach(function(conversation){
			Message.find({conversationId: conversation._id})
			.sort('-createdAt')
			.limit(1)
			.populate('author', 'name _id')
			.exec(function(err, message){
				console.log('message!!!!!!!!!!!!!!!!');
				console.log(message);
				if (err){
					console.log('conv2 err!!!!!!!!!!!!!!!!!!!!');
					console.log(err);
					return reject(2);
				}
				allConversations.push({'message': message, 'conversation': conversation});
				if(allConversations.length === conversations.length) {
					console.log('in conversations return');
					allConversations.sort(function(a,b){
						if (a.message[0].createdAt > b.message[0].createdAt){
							return -1
						}
						if (a.message[0].createdAt < b.message[0].createdAt){
							return 1
						}
						return 0
					})
					return resolve({ conversations: allConversations })
				}
            	

			})
		})

	})
}





exports.getConversationsSocket = function(user){
    console.log('in getconversations');
	Conversation.find({participants: user._id})
	.select('_id participants')
	.populate('participants','name')
	.exec(function(err,conversations){
		if (err){
			return {err:err};
		}
		let allConversations = [];
		conversations.forEach(function(conversation){
			Message.find({conversationId: conversation._id})
			.sort('createdAt')
			.limit(1)
			.populate('author', 'name _id avatarURL')
			.exec(function(err, message){
				if (err){
					return {err:err};
				}
				allConversations.push({'message': message, 'conversation': conversation});
				if(allConversations.length === conversations.length) {
              		return { conversations: allConversations };
            	}

			})
		})

	})
}


var getConversation1 = function(conversationId){
	return new Promise((resolve,reject)=>{
		console.log(' in getConversation');
		Message.find({conversationId: conversationId})
		.sort({ createdAt : 1})
		.populate('author', 'name _id avatarURL')
		.exec(function(err, messages){
			if(err){
				return reject( {error:err})
			}
			return resolve({ messages: messages })
		})
	})
}



exports.getConversation = function(req,res,next){
	console.log(' in getConversation');
	console.log('here in get conversation')
	Message.find({conversationId: req.params.conversationId})
	.sort({ createdAt : 1})
	.populate('author', 'name _id avatarURL')
	.exec(function(err, messages){
  
		if(err){
			res.json({err: err})
			return next(err)
		}
		res.status(200).json({ conversation: messages });
	})
}

exports.newConversation = function(req, res, next){
	if(!req.body.recipient) {
    	res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    	return next();
  	}
  	if(!req.body.composedMessage) {
    	res.status(422).send({ error: 'Please enter a message.' });
    	return next();
  	}
  	const conversation = new Conversation({
  		participants: [req.user._id, req.body.recipient]
  	})

  	conversation.save(function(err, newConversation){
  		if(err){
  			res.send({error:err});
  			return next(err);
  		}
  		const message = new Message({
  	  		conversationId: newConversation._id,
      		body: req.body.composedMessage,
      		author: req.user._id
  		})
  		message.save(function(err, newMessage) {
    		if (err) {
        		res.send({ error: err });
        		return next(err);
     		}


      		res.status(200).json({ message: 'Conversation started!', conversationId: conversation._id });
      		return next();
    		});
  	})
  	console.log(3)
}

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ChatFrame from '../src/components/chatFrame';
import socketClient from '../src/socketClient';
import rootReducer from '../src/reducers/chatReducer';
import configureStore from '../src/configureStore';
import socketMiddleware from '../src/socketMiddleware';
import {LOAD_CONVERSATIONS} from '../src/actions/type';
import {StyleRoot} from 'radium';
import templateChat from '../templateChat';
import Testing from '../testing';
import template from '../template';
import { renderToString } from 'react-dom/server';
import React from 'react';




exports.message = {
	get: function(req,res){
		const user = req.user;
  		let radiumProp = { radiumConfig:{userAgent: req.headers['user-agent']}};
		let preloadedState = { user }
		const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
		const store = createStoreWithMiddleWare(rootReducer);
		const html = renderToString(<Provider store={store} {...radiumProp}><StyleRoot></StyleRoot></Provider>);
		var finalState = store.getState()
		finalState = {...finalState,...preloadedState}
		res.send(templateChat(html, 'chatting',finalState, radiumProp))
	}
}
