import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import * as getTime from '../../getTimeDisplay';



class ChatWindow extends React.Component{	

	constructor(props){
		super(props);	
	    this.state = {atBottom:false, displayNoti:false};
		this.scrollToBottom = this.scrollToBottom.bind(this);
		this.handleConversationScroll = this.handleConversationScroll.bind(this);
		this.inputBoxKeyPress = this.inputBoxKeyPress.bind(this);
		this.messageComponent = this.messageComponent.bind(this);

	}

	componentDidMount(){
		this.inputBox.focus();
		this.conversationWindowEl.addEventListener('scroll', this.handleConversationScroll);
		this.scrollToBottom();
		console.log('componeneDidMount!!!!!!!!!!!!!!!!!');
		var convExist = 'CON_EXIST';
		var conNExist = 'CON_N_EXIST';
		var notLoaded = 'NOT_LOADED';
/*
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
		else{   
				console.log('no loaded yet');					
				this.props.setChosenRecipient(this.props.match.params.recipientId, null, notLoaded);				
		}
*/		

	}

	componentWillReceiveProps(nextProps){
		
		var bottomLine = this.conversationWindowEl.scrollHeight - this.conversationWindowEl.clientHeight;
		var atBottom = this.conversationWindowEl.scrollTop >= bottomLine ? true: false;
		this.setState({atBottom:atBottom});
/*
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
			else{   
					console.log('no loaded yet prop');					
					this.props.setChosenRecipient(nextProps.match.params.recipientId, null, notLoaded);				
			}
		}
		*/
	}	

	createMarkup(string) {
  		return {__html: string};
	}

	messageComponent(string) {
  		return <div dangerouslySetInnerHTML={this.createMarkup(string)} />;
	}

	componentDidUpdate(prevProps,prevState){
		var preMessages = prevProps.conversationData.messages;
		var thisMessages = this.props.conversationData.messages;
		var bottomLine = this.state.scrollHeight - this.state.clientHeight;
		if(this.props.conversationData.chosenId !== prevProps.conversationData.chosenId & 
			this.props.conversationData.conversationType !== prevProps.conversationData.conversationType){
			this.inputBox.focus();
			this.scrollToBottom();
		}
		else if(thisMessages.length!==0){

			if(preMessages.length===0){
				this.scrollToBottom();
			}
			else if(preMessages[preMessages.length-1]._id !== thisMessages[thisMessages.length-1]._id){
				console.log('new message');
				if(thisMessages[thisMessages.length-1].author._id === this.props.user._id || 
					this.state.atBottom){
					this.scrollToBottom();
				}
				else{
					this.conversationNoti.style.display = 'block';
				}
			}
		}

	}	

	handleConversationScroll(){
		var bottomLine = this.conversationWindowEl.scrollHeight - this.conversationWindowEl.clientHeight;
		var atBottom = this.conversationWindowEl.scrollTop >= bottomLine ? true: false;
		if(atBottom){
			this.conversationNoti.style.display = 'none';
		}
	}

	scrollToBottom() {
		this.conversationWindowEl.scrollTop = this.conversationWindowEl.scrollHeight;  	
	}

	conversationDisplay(){
		console.log('indisplay');
		console.log(this.props.conversationData.chosenId);

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
		console.log('after declaire messages');
		if(messages.length !==0 &
			this.props.conversationData.conversationType === 'RECIPIENT'){
			console.log('in if messages not empty');
			console.log(messages);
			
			var dateLast = 0;
			var yearLast = 0;
			var dateDisplayStyle;
			return messages.map((message,index, array)=>{
				const outerBoxStyle = message.author._id === this.props.user._id ? rightOuterBoxStyle : leftOuterBoxStyle;
				const innderBoxStyle = message.author._id === this.props.user._id ? rightStyle : leftStyle;
				const timeStyle = message.author._id === this.props.user._id ? {float: 'right'} : {float :'left'};
				const avatarDisplayStyle = message.author._id === this.props.user._id ?{display:'none'}: avatarStyle
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

				var space20 =false;

				if(index === array.length-1 || array[index+1].author._id !== message.author._id){
					space20=true;
				}
				const space20Style = {
					height:20,
					display: space20? 'block':'none' 
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
										{this.messageComponent(message.body)}
									</div>
								</div>
							</div>

						</div>
						<div style = {space20Style}>
						</div>
					</div>
					)
			});
		}
		else{
			console.log('no message');
			console.log(this.props.conversationData);
			return <div>start a conversation</div>
		} 
	}  

	newMessageFromBox(e){
		e.preventDefault();

		if(!this.props.recipientConversationId[this.props.conversationData.chosenId]){
			this.props.newConversationSocket('RECIPIENT', this.inputBox.innerHTML, this.props.conversationData.chosenId);
		}
		else{
			console.log('in new message ChatWindowTest');
			this.props.newMessageSocket('RECIPIENT', this.props.conversationData.chosenId,
			this.inputBox.innerHTML, this.props.recipientConversationId[this.props.conversationData.chosenId]);
		}
		this.inputBox.innerHTML='';
	}


	inputBoxKeyPress(e){
		if (e.which === 13 && e.shiftKey != 1){
			e.preventDefault();
			this.newMessageFromBox(e);
		}
	}

	render(){
			/*const messageWindowStyle = {
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
*/
			const conversationWindowStyle = {
				height:'100%',
				width:'100%',
				display: 'flex',
				flexDirection : 'column',
			}
			const conversationsStyle = {
				flex:1, 
				minWidth:0,
				overflowY: 'scroll'

			}
			const inputBoxStyle = {
				width : '100%',
				wordWrap: 'breakWord',
				height :32,
				overflowY:'scroll'
			}

			const newMessageNoti = {
				position:'fixed', 
				top:0,
				width:'100%',
				backgroundColor:'yellow',
				display: 'none'
			}

			const chatWindowBarStyle = {
				backgroundColor:'yellow',
				height: 25,
				display:'flex',
				justifyContent:'flex-end',
				alignItems:'center',
				padding : '0 5px 0px 15px'
			}

			return (

				<div style ={conversationWindowStyle}>
					<div style = {newMessageNoti} ref = {(el)=> {this.conversationNoti=el}}>
						new Message
					</div>
					<div style={chatWindowBarStyle}>
						<span style ={{flex:1, overflow:'hidden', whiteSpace:'nowrap', textOverflow:'ellipsis'}}>
							{!this.props.conversationData.recipient?'':this.props.conversationData.recipient.name}
						</span>
						<div onClick = {()=>this.props.onChatWindowDisplayChange(false)}>
							<i className="fa fa-times"></i>
						</div>
					</div>
 					<div style = {conversationsStyle} ref = {(el)=>{this.conversationWindowEl=el}}>
						{this.conversationDisplay()}
				 	</div>
				 	<div >
				 		<form onSubmit = {(e) => this.newMessageFromBox(e)}>
				 			<div ref= {(el)=>{this.inputBox = el}} suppressContentEditableWarning='true' contentEditable ='true' style = {{height:50, overflowY:'scroll', border:'1px solid black'}} onKeyPress = {(e)=>this.inputBoxKeyPress(e)}></div>
							<input type = 'submit' value="Submit" ></input>
					 	</form>
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
    	conversations: state.conversations,
    	user:state.user
    }
}
	
export default connect(mapStateToProps, actions)(Radium(ChatWindow));
 