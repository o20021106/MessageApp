eport funciton send(conversationId, content){
	const message ={conversationId, content};
	return({
		type: 'socket',
		promise : (socket) =>socket.emit('sendMessage', message)
	});
}