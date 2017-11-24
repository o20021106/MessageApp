var mongoose = require("mongoose");
var Schema = mongoose.Schema

var messageSchema = new Schema({
	conversationId: {type : Schema.Types.ObjectId, required: true},
	body : {type : String},
	author: { type: Schema.Types.ObjectId, required: true, ref : 'User'}
},
{
	timestamps: true
});

module.exports = mongoose.model('message', messageSchema, "message");
//module.exports = mongoose.model('Message', MessageSchema);