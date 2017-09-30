var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var conversationSchema = new Schema({
	participants : [{ type: Schema.Types.ObjectId, ref: 'User'}]
});

module.exports = mongoose.model('Conversation', ConversationSchema, "Conversation")
