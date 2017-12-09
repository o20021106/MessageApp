/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import send from './send';


class ChatWindow extends React.Component{	
	constructor(props){
		super(props);	
	    this.state = {messageBuffer:'asdfadsfasdf'};

	}


	conversationDisplay(){
		var messages = this.props.currentConversation;

		if(messages.length !==0){
			return messages.map(message=>(<div key ={message._id}>name: {message.author.name}  message:{message.body}</div>));
		}
	}
	insertText(e){
		e.preventDefault();
		this.setState({messageBuffer:e.target.value});
	}
	newMessage(e){
		e.preventDefault();
		this.props.newMessageSocket(this.state.messageBuffer, this.props.chosenConversation);
	}
    
	render(){
		return (
			<div>
			 in chat window
			 {this.conversationDisplay()}
			 <form onSubmit = {(e) => this.newMessage(e)}>
			 	<input type = 'text' name = 'composedMessage' onChange = {(e)=> this.insertText(e)}></input>
				<input type = 'submit' value="Submit" ></input>
			 </form>
			</div>)
	}  	  
} 

function mapStateToProps(state) {
    return { chosenConversation: state.chosenConversation, currentConversation: state.currentConversation};
}
	
export default connect(mapStateToProps, actions)(ChatWindow);
     