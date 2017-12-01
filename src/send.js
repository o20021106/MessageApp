export default function send() {
  return {
    type: 'socket',
    promise: function(socket){
    	console.log('inside socket here');
    	return socket.emit('event','momomomomo~~~~~~~~~~~~~~');
    }
  }
}