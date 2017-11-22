

const Conversation = require('../src/models/conversation'),
      Message = require('../src/models/message'),
      User = require('../src/models/user');

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