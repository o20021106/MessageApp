const Conversation = require("../src/models/conversation"),
		Message = require("../src/models/message"),
		User = require("../src/models/user");

export.getConversations = function(req, res, next){
    
	Conversation.find({participants: req.user._id})
	.select('_id')
	.exec(function(err,conversations){
		if (err){
			res.joson({err:err});
			return next(err);
		}
		allConversations = [];
		conversations.forEach(function(conversation){
			Message.find({conversationId: conversation._id})
			.sort('createdAt')
			.limit(1)
			.populate('author', 'name')
			.exec(function(err, message){
				if (err){
					res.joson({err:err});
					return next(err);
				}
				allconversations.push(message);
			})
		})
		return res.status(200).json({ conversations: allConversations })
	})
	}
}

export.getConversation = function(req,res,next){
	Message.find({Conversation_id: req.params.conversationId})
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

export.newConversation = function(req, res, next){
	if(!req.params.recipient) {
    	res.status(422).send({ error: 'Please choose a valid recipient for your message.' });
    	return next();
  	}
  	if(!req.body.composedMessage) {
    	res.status(422).send({ error: 'Please enter a message.' });
    	return next();
  	}

  	const conversation = new Conversation({
  		participants: [req.user._id, req.params.recipient]
  	})

  	conversation.save(function(err, newConversation){
  		if(err){
  			res.send({error:err});
  			return next(err);
  		}
  	})

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
}



