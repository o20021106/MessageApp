import React from 'react';
import ReactDOM from 'react-dom';

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
import Radium from 'radium';
import {StyleRoot} from 'radium';
import * as getTime from './getTimeDisplay';



class ChatWindowTest extends React.Component{	

	constructor(props){
		super(props);	
	    this.state = {messageBuffer:'asdfadsfasdf',scrollHeight:0,scrollTOp:0,clientHeight:0};
	    this.scrollToBottom = this.scrollToBottom.bind(this);
	    this.scrollToBottom2 = this.scrollToBottom2.bind(this);

	}
	componentDidMount(){
		this.scrollToBottom2();
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
	componentWillUpdate(){
		this.setState({scrollHeght:this.conversationWindowEl.scrollHeight, 
			scrollTop: this.conversationWindowEl.scrollTop,
			clientHeight:this.conversationWindowEl.clientHeight});
	}
	componentDidUpdate(prevProps,prevState){
		console.log('in update!!!!!!!!!!!!!!!');

		console.log(prevProps);
		console.log('conversationData' in prevProps);
		console.log('in if');
		var preMessages = prevProps.conversationData.messages;
		var thisMessages = this.props.conversationData.messages;
		var bottomLine = this.state.scrollHeight - this.state.clientHeight;

		if(thisMessages.length!==0){
			console.log('this.message');
			console.log(thisMessages);
			if(preMessages.length===0){
				this.scrollToBottom2();
			}
			else if(preMessages[preMessages.length-1]._id !== thisMessages[thisMessages.length-1]._id && this.state.scrollTop >= bottomLine){
					scrollToBottom2();
					console.log('in scroll');
			}
			else{

				console.log('in alert!!!!!!!!!!!!!!!!');
				console.log(preMessages[preMessages.length-1]._id);
				console.log(thisMessages[thisMessages.length-1]._id);
				console.log(this.state.scrollTop);
				console.log(this.state.clientHeight);
				console.log(bottomLine);
			}
		}


		console.log('componeneDidMount');
		//this.scrollToBottom2();

		console.log('componeneDidMount2')
	}	

	scrollToBottom2() {
		console.log('scro22222222222222222222222222222222');
		console.log(this.conversationWindowEl.scrollHeight);
		console.log(this.conversationWindowEl.scrollTop);

		this.conversationWindowEl.scrollTop = this.conversationWindowEl.scrollHeight;  	
	}
	scrollToBottom() {
		console.log('scrolllllllllllllllllllllllllllllllllll');
    	this.el.scrollIntoView({ behaviour: 'smooth' });
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
			minWidth:0,
			marginTop:2,
			marginBottom:2,
			display:'flex'
		}
		const rightOuterBoxStyle = {flex:1, marginLeft: 36,marginRight:12, minWidth:0,zoom:1,display:'flex'}
		const leftOuterBoxStyle = {flex:1,marginRight: 36,marginLeft:12, minWidth:0,zoom:1, display:'flex'}

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
		const avatarStyle = {
				float:'left',
				borderRadius: '50%',
				width: '30px',
				height:'30px',
				objectFit: 'cover',
				display: 'inline-block'
			}
		var messages = this.props.conversationData.messages;
		if(messages.length !==0 &
		this.props.conversationData.chosenId === this.props.match.params.recipientId & 
		this.props.conversationData.conversationType === 'RECIPIENT'){
			console.log('in if');
			console.log(messages);
			
			var dateLast = 0;
			var yearLast = 0;
			var dateDisplayStyle;
			return messages.map((message)=>{
				const outerBoxStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ? rightOuterBoxStyle : leftOuterBoxStyle;
				const innderBoxStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ? rightStyle : leftStyle;
				const timeStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ? {float: 'right'} : {float :'left'};

				const avatarDisplayStyle = message.author._id === JSON.parse(localStorage.getItem("user"))._id ?{display:'none'}: avatarStyle
				const displayTime = getTime.getMessageTime(message.createdAt);
				
				var createdTime = new Date(message.createdAt);
				if (createdTime.getFullYear()!==yearLast ||dateLast!== createdTime.getDate()){


					yearLast = createdTime.getFullYear();
					dateLast = createdTime.getDate();

					dateDisplayStyle = {display:'block'}
				}
				else{
					dateDisplayStyle = {display:'none'}
				}

				return (
					<div style ={{width : '100%'}} key ={message._id}>
						<div style = {[dateDisplayStyle,{width:'100%', textAlign:'center'}]} >
							{displayTime.date}
						</div>
						<div  style = {messageStyle}>
							<div style = {outerBoxStyle}>
								<div style = {{display:'flex',alignItems:'start'}}>
									<img src = {message.author.avatarURL} style ={avatarDisplayStyle}></img>
								</div>
								<div style = {{display:'inline-block',flex:1, minWidth:0,paddingLeft:10,paddingRight:10}}>
									<div style = {timeStyle}>
										{displayTime.time}
									</div>
									<div style = {[innderBoxStyle,{display:'inline-block', alignItems:'center',padding:'12px 16px', borderRadius:'6px'}]}>								
										{message.body}
									</div>
								</div>
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

			const conversationColumnStyle = {
				display : 'none',
				
				'@media (min-width: 480px)':{
					display : 'block',
					maxWidth:240,
				}
			}

			/*window.innerWidth >= 960 ?{
				maxWidth:240,
			} : {
				display: 'none'
			}*/

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
				marginBottom: 20
			}
			const inputBoxStyle = {
				width : '100%',
				wordWrap: 'breakWord',
				height :32,
				overflowY:scroll
			}

			const hoverTtst = {
				height: 50,
				':hover':{
					backgroundColor: 'blue'
				}
			}
			return (
				<div style = {messageWindowStyle}>

						<div style = {conversationColumnStyle}>
							<ConversationColumn/>
						</div>
					<div style ={conversationWindowStyle}>
						<div style = {conversationsStyle} ref = {(el)=>{this.conversationWindowEl=el}}>
							{this.conversationDisplay()}
					 	</div>
					 	<div >
					 		<form onSubmit = {(e) => this.newMessage(e)}>
							 	<input style = {inputBoxStyle} type = 'text'id = 'composedMessage' onChange = {(e)=> this.insertText(e)}></input>
								<input type = 'submit' value="Submit" ></input>
						 	</form>
						 </div>
					 </div>
					 <div ref = {(el)=>{this.el=el}}></div>
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
	
export default connect(mapStateToProps, actions)(Radium(ChatWindowTest));
 

var styles = {
  base: {
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      background: 'black'
    }
  },

  primary: {
    background: '#0074D9'
  },

  warning: {
    background: '#FF4136'
  }
};