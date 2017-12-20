import React from 'react';
import { connect } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import SearchUser from './searchUser';
import ConversationList from './conversationList';



class ChatWindowTest extends React.Component{	

	constructor(props){
		super(props);	
	    this.state = {messageBuffer:'asdfadsfasdf'};

	}
	componentDidMount(){
		console.log('componeneDidMount!!!!!!!!!!!!!!!!!');
		console.log(Object.keys(this.props.recipientConversationId).length);
		//if(Object.keys(this.props.recipientConversationId).length !== 0){
		var convExist = 'CON_EXIST';
		var conNExist = 'CON_N_EXIST';
		var notLoaded = 'NOT_LOADED';


		if(this.props.match.params.recipientId in this.props.recipientConversationId){		
			if(this.props.recipientConversationId[this.props.match.params.recipientId]){
				console.log('no loaded yet2');

				this.props.setChosenRecipient(this.props.match.params.recipientId,
					this.props.recipientConversationId[this.props.match.params.recipientId], convExist);
			}
			else{
				console.log('no loaded second if');
				this.props.setChosenRecipient(this.props.match.params.recipientId, null, conNExist);
			}
		}
		else{   //
							console.log('no loaded yet');					

				this.props.setChosenRecipient(this.props.match.params.recipientId, null, notLoaded);				
		}

	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps);
		
		console.log(Object.keys(this.props.recipientConversationId).length);
		if(this.props.match.params.recipientId !== nextProps.match.params.recipientId){
			console.log('transition');
			var convExist = 'CON_EXIST';
			var conNExist = 'CON_N_EXIST';
			var notLoaded = 'NOT_LOADED';


			if(nextProps.match.params.recipientId in this.props.recipientConversationId){		
				if(this.props.recipientConversationId[nextProps.match.params.recipientId]){
										console.log('no loaded yet prop');

					this.props.setChosenRecipient(nextProps.match.params.recipientId,
						this.props.recipientConversationId[nextProps.match.params.recipientId], convExist);
				}
				else{
					console.log('no loaded prop second if');
					this.props.setChosenRecipient(nextProps.match.params.recipientId, null, conNExist);

				}
			}
			else{   //
									console.log('no loaded yet prop');					

					this.props.setChosenRecipient(nextProps.match.params.recipientId, null, notLoaded);				
			}
		}
	}		

	conversationList(){
		console.log('in conversation');
		if(!(this.props.conversations.length === 0)){
			console.log('inside inside');
			return this.props.conversations.map(function(conversation){
				console.log('conversation!!!!!!!!!!!!!!!!!!');
				console.log(conversation.conversation.participants[0]._id);
				console.log(localStorage.getItem('user')._id);
				var participant = conversation.conversation.participants.filter(participant => participant._id!=JSON.parse(localStorage.getItem("user"))._id);
				console.log(localStorage.getItem("user"));
				console.log(conversation);
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

	conversationDisplay(){
		console.log('indisplay');
		console.log(this.props.conversationData.chosenId);
		console.log(this.props.match.params.recipientId);
		console.log(this.props.conversationData.conversationType);

		var messages = this.props.conversationData.messages;
		if(messages.length !==0 &
		this.props.conversationData.chosenId === this.props.match.params.recipientId & 
		this.props.conversationData.conversationType === 'RECIPIENT'){
			console.log('in if');
			console.log(messages);
			return messages.map(message=>(
				<div key ={message._id}>
					name: {message.author.name}  message:{message.body}
				</div>
			));
		}
		else{
			console.log(this.props.conversationData);
			return <div>not showing</div>
		} 
	}

	insertText(e){
		e.preventDefault();
		this.setState({messageBuffer:e.target.value});
	}

	newMessage(e){
		e.preventDefault();
		e.target.querySelector('#composedMessage').value = '';

		if(!this.props.recipientConversationId[this.props.match.params.recipientId]){
			this.props.newConversationSocket('RECIPIENT', this.state.messageBuffer, this.props.match.params.recipientId);
		}
		else{
			console.log('in new message ChatWindowTest');
			this.props.newMessageSocket('RECIPIENT', this.props.match.params.recipientId,
				this.state.messageBuffer, this.props.recipientConversationId[this.props.match.params.recipientId]);
		}
	}   

	render(){
		console.log('in chat window test render');
		console.log(this.props.conversationData.chosenId);
		console.log(this.props.recipientConversationId[this.props.match.params.recipientId]);
		console.log(this.props.conversationData.messages);
			return (
				<div>
					{this.props.chosenConversation}<br/>
					{this.props.match.params.conversationId}
					<SearchUser/>
					<ConversationList/>
					{this.conversationDisplay()}
			 		<form onSubmit = {(e) => this.newMessage(e)}>
					 	<input type = 'text'id = 'composedMessage' onChange = {(e)=> this.insertText(e)}></input>
						<input type = 'submit' value="Submit" ></input>

				 	</form>
				 	{this.state.messageBuffer}
				 </div>
			)	
		

	}
}



function mapStateToProps(state) {
    return { chosenConversation: state.chosenConversation, 
    	currentConversation: state.currentConversation, 
    	latestRecipient:state.latestRecipient,
    	currentConversationId: state.currentConversationId,
    	recipientConversationId: state.recipientConversationId,
    	conversationData : state.conversationData,
    	conversations: state.conversations}
}
	
export default connect(mapStateToProps, actions)(ChatWindowTest);
 

