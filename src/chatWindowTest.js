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
import ConversationColumn from './conversationColumn';



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


		const messageStyle = {
			width : '100%',
			border:2,
			overflow:'auto',
			zoom:1
		}
		const rightOuterBoxStyle = {marginLeft: 36,overflow:'auto',zoom:1}
		const leftOuterBoxStyle = {marginRight: 36,overflow:'auto',zoom:1}

		const rightStyle= {
			float : 'right',
			clear: 'right',
			maxWidth : '95%',
			wordWrap:'break-word',
			backgroundColor : 'red'
		}

		const leftStyle = {
			float : 'left',
			clear: 'left',
			maxWidth : '95%',
			wordWrap:'break-word',
			backgroundColor : 'green'

		}
		var messages = this.props.conversationData.messages;
		if(messages.length !==0 &
		this.props.conversationData.chosenId === this.props.match.params.recipientId & 
		this.props.conversationData.conversationType === 'RECIPIENT'){
			console.log('in if');
			console.log(messages);
			
			
			return messages.map(message=>{
				const outerBoxStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ? rightOuterBoxStyle : leftOuterBoxStyle;
				const innderBoxStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ? rightStyle : leftStyle;
			return (
					<div key ={message._id} style = {messageStyle}>
						<div style = {outerBoxStyle}>
							<div style = {innderBoxStyle}>								
							<img src = {message.author.avatarURL} width = '50px'></img>

								name: {message.author.name}  message:{message.body}
							</div>
						</div>
					</div>
					)
			});
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

			const messageWindowStyle = {
				display: 'flex',
				flex:1,
				minWidth:0
			}

			const conversationColumnStyle = window.innerWidth >= 960 ?{
				maxWidth:240,
			} : {
				display: 'none'
			}

			const conversationWindowStyle = {
				flex:1, 
				minWidth:0,
				display: 'flex',
				flexDirection : 'column' 
			}
			const conversationsStyle = {
				flex:1, 
				minWidth:0,
				overflowY: 'scroll',
			}
			const inputBoxStyle = {
				width : '100%',
				wordWrap: 'breakWord',
				height : 64,
				overflowY:scroll
			}
			return (
				<div style = {messageWindowStyle}>
					<div style = {conversationColumnStyle}>
						<ConversationColumn/>
					</div>
					<div style ={conversationWindowStyle}>
						<div style = {conversationsStyle}>
							{this.conversationDisplay()}
					 	</div>
					 	<div >
					 		<form onSubmit = {(e) => this.newMessage(e)}>
							 	<input style = {inputBoxStyle} type = 'text'id = 'composedMessage' onChange = {(e)=> this.insertText(e)}></input>
								<input type = 'submit' value="Submit" ></input>
						 	</form>
						 </div>
					 </div>
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
 

