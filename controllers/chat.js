const Conversation = require("../src/models/conversation"),
		Message = require("../src/models/message"),
		User = require("../src/models/user");

var Promise = require ('promise');

exports.getRecipients = function(req, res, next){
	User.find({})
	.select('_id name')
	.exec(function(err,users){
		if (err){
			res.json({err:err});
			return next(err);
		}
		return res.status(200).json({ users: users })
	})
}

exports.getConversationByRecipientId = function(req,res,next){
	console.log(' in getConversationByRecipeintId');
//	options= {upsert: true, new: true};
//$or: [{a: 1}, {b: 1}]
//db.shapes.find({'shape.id':{$all:[1,2]},shape:{$size:2}}); 

	Conversation.findOne({$and: [{participants: {$all:[req.user._id, req.params.recipientId]}}, {participants: {$size :2} }]},function(err,conversation){
//	Conversation.findOne({participants: [req.user._id, req.params.recipientId]},function(err,conversation){
		if(err){
			return res.json({error:err})
		}
		if(!conversation){
			return res.status(200).json({status: 'noConversation'})
		}
		console.log([req.user._id, req.params.recipientId])
		console.log(conversation);
		var messages = getConversation1(conversation._id);
		messages.then(response=>{
			return res.status(200).json({conversationId: conversation._id, conversation:response.conversation})
		}) 

		
	})

}

exports.getConversations = function(req, res, next){
    console.log('in getconversations');
	Conversation.find({participants: req.user._id})
	.select('_id participants')
	.populate('participants','name')
	.exec(function(err,conversations){
		if (err){
			res.json({err:err});
			return next(err);
		}
		let allConversations = [];
		conversations.forEach(function(conversation){
			Message.find({conversationId: conversation._id})
			.sort('createdAt')
			.limit(1)
			.populate('author', 'name')
			.exec(function(err, message){
				if (err){
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
			.populate('author', 'name')
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
		.sort('-createdAt')
		.populate('author', 'name')
		.exec(function(err, messages){
			if(err){
				return reject( {error:err})
			}
			return resolve({ conversation: messages })
		})
	})
}



exports.getConversation = function(req,res,next){
	console.log(' in getConversation');
	Message.find({conversationId: req.params.conversationId})
	.sort('-createdAt')
	.populate('author', 'name')
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

