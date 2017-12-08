/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index'


class ChatWindow extends React.Component{	
	constructor(props){
		super(props);	
	}


	conversationDisplay(){
		var messages = this.props.currentConversation;

		if(messages.length !==0){
			return messages.map(message=>(<div key ={message._id}>name: {message.author.name}  message:{message.body}</div>));
		}
	}

	render(){
		return (
			<div>
			 in chat window
			 {this.conversationDisplay()}
			</div>)
	}  	  
} 

function mapStateToProps(state) {
    return { chosenConversation: state.chosenConversation, currentConversation: state.currentConversation};
}
	
export default connect(mapStateToProps, actions)(ChatWindow);
    