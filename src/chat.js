/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index'


class Chat extends React.Component{	
	constructor(props){
		super(props);
		this.state = {recipientId: '', messageBuffer:'asdfadsfasdf'};
		this.userList = this.userList.bind(this);
		this.changeRecipient = this.changeRecipient.bind(this);
		this.insertText = this.insertText.bind(this);
	}
	componentWillMount(){
		this.props.loadConversations();

		this.props.loadRecipients();
	}

	userList(){
		if(this.props.recipients.length == 0){
			console.log('why??');	
		}
		else{
			console.log('here');
			console.log(this.props.recipients.length)
			return this.props.recipients.map(user=>(<option key = {user._id} value = {user._id}>{user.name}</option>));
		}
	}


	changeRecipient(e){
		e.preventDefault();
		this.setState({recipientId: e.target.value});
	}

	insertText(e){
		e.preventDefault();
		this.setState({messageBuffer:e.target.value});
	}

	newMessage(e){
		e.preventDefault();
		var recipientId = this.state.recipientId;
		if (recipientId ===''){
			recipientId = this.props.recipients[0]._id;
		}
		console.log(recipientId);
		console.log(this.state.messageBuffer);
		fetch('/newMessage',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'Authorization' : localStorage.getItem("token"),

		    },
		    method: "POST",
		    body: JSON.stringify({recipient:recipientId, composedMessage:this.state.messageBuffer})
		})
		.then(function(response) {
		    console.log(response);
		})
	}

	participantsNames(participants){
		console.log('in par ');
		console.log(participants);  
		return participants.map(participant => (<div key= {participant._id}>{participant.name}</div>));
	}
	conversationList(){
		if(!(this.props.conversations.length === 0)){
			console.log('in conversation if');
			return this.props.conversations.map(conversation =>(<div key = {conversation.conversation._id}>
			participants: {this.participantsNames(conversation.conversation.participants)} message:{conversation.message[0].body}
			by: {conversation.message[0].auther}</div>))
		}
	}



	render(){

		return (
			<div>
				<form onSubmit = {(e) => this.newMessage(e)}>
				 	<select name="recipient" onChange = {(e)=> this.changeRecipient(e)}>
     					{this.userList()}
				  	</select>
				  	<input type = 'text' name = 'composedMessage' onChange = {(e)=> this.insertText(e)}></input>
				  	<input type="submit" value="Submit" ></input>
				</form> 
				{this.conversationList()}
			</div>)
	}

 	
}

function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations};
}
	
export default connect(mapStateToProps, actions)(Chat);
 