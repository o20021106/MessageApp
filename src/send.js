export default function send(composedMessage,conversationId) {
  return {
    type: 'socket',
    promise: function(socket){
    	console.log('inside socket here');
    	return socket.emit('message',{compsedMessage:compsedMessage, conversationId:conversationId});
    }
  }
}