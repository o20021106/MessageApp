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
	     	Message.find({_id : newMessage.id})
	     	.populate('author','name _id avatarURL')
	     	.exec(function(err, rMessage){
	     		if (err) {
	    		console.log('new message save err');
	        	return reject({ error: err });
	     		}
	     		return resolve({status: 'message sent', message : {conversationId: conversationId, message: rMessage}});
	     	})
//	      	return resolve({ message: newMessage});
    	});
  	})  
}  

exports.newConversation = function(user, recipientId, composedMessage,){
	return new Promise((resolve, reject)=>{
		console.log('in new COnversation before if');
		if(!composedMessage) {

			console.log('wrong composedMessage');
			console.log(composedMessage);
 
	  		return reject({message:'wrong composedMessage'})
	  	}
	  	if(!recipientId) {
	  		console.log('wrong recipient');
	  		console.log(recipientId);
	  		return reject({message:'wrong recipient'})
	  	}
		console.log('after new COnversation before if');

		//check whether a conversation already exist  
		//find({ words: { $all: ["text", "here"] }})
		//Conversation.findOne({$and: [{participants: {$in:[req.user._id]}}, {participants: {$size :2} }]})
		console.log('whats happening');
		console.log(user._id);

		console.log(recipientId);

		Conversation.find({$and:[{participants: {$all:[user._id, recipientId]}},{participants: {$size :2}}]})
	  	.exec(function(err,searchedConversation){
	  		console.log('executed');
	  		if(err){
	  			console.log('in search con err');
	  			return reject(err);
	  		}
	  		else if(searchedConversation.length != 0){
	  			console.log('con existed');

	  			newMessage(user, searchedConversation._id, composedMessage)
	  			.then(response=>{
	  				resolve({conversationAlreadyExist:true, message:response.message});
	  			})
	  			.catch(err=>{
	  				console.log(err);
	  				resolve({conversationAlreadyExist:true, conversation:searchedConversation[0]},{err:err});
	  			})
	  		}
	  		else{
	  			console.log('not existed');
	  			const conversation = new Conversation({
			  		participants: [user._id, recipientId]
			  	})

			  	conversation.save(function(err, newConversation){
			  		if(err){
			  			return reject({error:err})
			  		}
			  		const message = new Message({
			  	  		conversationId: newConversation._id,
			      		body: composedMessage,
			      		author: user._id
			  		});
					console.log('new conversation before message save');

			  		message.save(function(err, newMessage) {
			    		if (err) {
			    			return reject({error:err})
			     		}
			     		Conversation.populate(newConversation, {path:'participants',select:'name _id avatarURL'}, function(err, newConversation){
			     			
			     			if(err){
			     				console.log(err);
			     			}
			     			Message.populate(newMessage,{path:'author', select:'name _id avatarURL'},function(err,newPopulatedMessage){
			     				if(err){
			     					console.log(err);
			     					reject(err);
			     				}
			     				console.log('save successfully');
			     				return resolve({
			     					message :newPopulatedMessage,
			     					conversation:newConversation
			     				})


			     			})
			     		})
			    	});

			  	});

	  		}
	  	});

	  	
	})
}
