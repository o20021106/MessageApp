const Conversation = require("../src/models/conversation"),
		Message = require("../src/models/message"),
		User = require("../src/models/user");


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

