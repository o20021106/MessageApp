/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import {connect} from 'react-redux';
import Chat from './chat';
import ChatWindow from './chatWindow';
class ChatFrame extends React.Component{	

	render(){
		this.props.dispatch(
			{
				type: 'socket',
        		promise: function(socket,next){
    				console.log('inside socket for on');
    				return socket.on('newMessage',function(data){
    					console.log('inside callback function for on');
    					next({type:'UPDATE_CONVERSATION_MESSAGES', message: data.message});

    		//{composedMessage:composedMessage, conversationId:conversationId}
    				});
    			}
			});

		return (
			<div>
				<Chat />
				<ChatWindow />
			</div>)
	}

 	
}
 
export default connect()(ChatFrame);
 