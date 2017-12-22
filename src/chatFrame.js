/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import {connect} from 'react-redux';
import Chat from './chat2';
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
    					next({type:'RECIEVE_NEW_MESSAGE', message: data.message, chosenId:data.chosenId, conversationType:data.conversationType,});
    				});
    			}
			}); 

		this.props.dispatch(
			{
				type: 'socket',
        		promise: function(socket,next){
    				console.log('inside socket for on');
    				return socket.on('NEW_CONVERSATION',function(data){
    					console.log('ireceived a new conversation!!!!!!!!!!!!!!!!!!!!!!');
    					console.log(data);
    					next({type:'NEW_CONVERSATION', ...data});

    				});
    			}
			});

		this.props.dispatch(
			{
				type: 'socket',
        		promise: function(socket,next){
    				console.log('inside socket for on');
    				return socket.on('REDIRECT',function(destination){
    					console.log('Redirect to!!!!!!!!!!!!!!!!!!!!!!');
    					window.history.pushState('data to be passed', 'Title of the page', '/conversation/aaaa');

    				});
    			}
			});


		return <Chat />
			

	}

 	
}
 
export default connect()(ChatFrame);
 