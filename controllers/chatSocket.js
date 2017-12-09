var Promise = require ('promise');
const Conversation = require("../src/models/conversation"),
		Message = require("../src/models/message"),
		User = require("../src/models/user");
/*
exports.newMessage = function(user, recipient, composedMessage){
	console.log('before promise');
	return new Promise((resolve, reject) =>{
		console.log('in promise');

		console.log(composedMessage);
		if(!recipient) {
			console.log('recipeint wrong');
    		return reject({ error: 'Please choose a valid recipient for your message.' });
  		}
  		if(!composedMessage) {
  			console.log('composed message wrong')
  			return reject({ error: 'Please enter a message.' });
	  	}

	  	console.log('before constructed conversation');
	  	console.log(recipient);
	  	console.log(user);
        console.log(user._id);
	  	const conversation = new Conversation({
  			participants: [user._id, recipient]
	  	});

	  	console.log('constructed conversation');
	  	conversation.save(function(err, newConversation){
	  		console.log('in new conversation');
  			if(err){	
  				console.log('conversation save message'); 
  				return reject({error:err});
  			}
  			const message = new Message({
	  	  		conversationId: newConversation._id,
	      		body: composedMessage,
	      		author: user._id
  			});   
  			message.save(function(err, newMessage) {
	    		if (err) {
	    			console.log('new message save err');
	        		return { error: err };
	     		}
	     		console.log('in message');
	      		return resolve({ message: 'message sent', conversationId: conversation._id });
    		});
  		})

	})
}
*/
exports.newMessage = function(user, conversationId, composedMessage){
	console.log('before promise');
	return new Promise((resolve, reject) =>{
		console.log('in promise');
		console.log(conversationId);
		console.log(composedMessage);
		if(!conversationId) {
			console.log('conversation wrong');
    		return reject({ error: 'Please choose a valid conversation for your message.' });
  		}
  		if(!composedMessage) {
  			console.log('composed message wrong')
  			return reject({ error: 'Please enter a message.' });
	  	}

	  	console.log('before constructed conversation');
	  	console.log(conversationId);
	  	console.log(user);
        console.log(user._id);
        const message = new Message({
	  	  		conversationId: conversationId,
	      		body: composedMessage,
	      		author: user._id
  			});   
  		message.save(function(err, newMessage) {
	    	if (err) {
	    		console.log('new message save err');
	        	return reject({ error: err });
	     	}
	     	console.log('in message');
	      	return resolve({ message: 'message sent'});
    	});
  	})  
}