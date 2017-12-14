import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import ChatWindowTest from './chatWindowTest';
import io from 'socket.io-client';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class Test extends React.Component{	

	componeneDidMount(){
		if (this.props.match.path === '/conversation/:conversationId'){
			this.props.setChosenConversation(this.props.match.params.conversationId);
		}
	}

	render(){

		return this.props.match.path === '/conversation/:conversationId' ? (<div>{this.props.match.params.conversationId}</div>) : (<div>{this.props.match.params.recipientId}</div>)
	}
}


 

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
			console.log('User has zero conversation yet');	
		}
		else{
			console.log('here');
			console.log(this.props.recipients.length);
			return this.props.recipients.map(function(user){
				return (
					<div key = {user._id}>
						<Link to = {`/recipient/${user._id}`}  >
							{user.name}
						</Link>
					</div>
					)
			})
		}
	}


	changeRecipient(e){
		e.preventDefault();
		this.setState({recipientId: e.target.value});
		this.props.getConversationByRecipientId(e.target.value);
	}

	insertText(e){
		e.preventDefault();
		this.setState({messageBuffer:e.target.value});
	}

	participantsNames(participants){ 
		console.log('in participant');
		return participants.map(participant => (<div key= {participant._id}>{participant.name}</div>));
	}
	
	selectConversation(e,conversationId){
		e.preventDefault();
		let data = e.currentTarget.getAttribute('data-href');
		this.props.setChosenConversation(conversationId);
		this.props.setLatestRecipient();
	}

	conversationList(){
		console.log('in conversation');
		if(!(this.props.conversations.length === 0)){
			console.log('inside inside');
			return this.props.conversations.map(function(conversation){
				
				console.log(conversation.conversation.participants[0]._id);
				console.log(localStorage.getItem('user')._id);
				var participant = conversation.conversation.participants.filter(participant => participant._id!=JSON.parse(localStorage.getItem("user"))._id);
				console.log(localStorage.getItem("user"));
				
				console.log(participant);
				console.log(conversation.conversation.participants);
				return(
				<li key = {conversation.conversation._id} >
					<Link to = {`/recipient/${participant[0]._id}`} >
						<div>
							participant: {participant[0].name}
						</div> 
						<div>
							{conversation.message[0].auther}
							{conversation.message[0].body}
						</div>
					</Link>
				</li>)
			})
		}
	}

 
    
	render(){

		return (
			<div>
				{JSON.parse(localStorage.getItem("user")).name}
				<Router>
					<div>
						{this.userList()}
						{this.conversationList()}
						<Route path= '/recipient/:recipientId'component = {ChatWindowTest}/>
						<Route path= '/conversation/:conversationId'component = {ChatWindowTest}/>
					</div>
				</Router>	
			</div>)
	}

 	
}





function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations};
}
	
export default connect(mapStateToProps, actions)(Chat);
 





/*

	newConversation(e){
		e.preventDefault();
		this.props.newConversationSocket(this.state.messageBuffer, this.state.recipientId);
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
*/
