const Conversation = require('../src/models/conversation'),
      Message = require('../src/models/message'),
      User = require('../src/models/user');

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