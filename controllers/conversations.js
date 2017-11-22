

//find all the conversations for a particular user


const Conversation = require('../src/models/conversation'),
      Message = require('../src/models/message'),
      User = require('../src/models/user');

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