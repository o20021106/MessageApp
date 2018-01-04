import React from 'react';
import { connect } from 'react-redux';
import * as actions from './actions/index';
import {  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { Redirect } from 'react-router';
import * as getTime from './getTimeDisplay';


class ConversationColumn extends React.Component{	

	constructor(props){
		super(props);
		this.state = {timeoutId: null, showConversations: true, keyWord:''};
		this.keyUpHandler = this.keyUpHandler.bind(this);
		this.insertKeyWord = this.insertKeyWord.bind(this);
		this.conversationList = this.conversationList.bind(this);
		this.clickSearchUser = this.clickSearchUser.bind(this);
	}

	decoder(encoded){
		var decoded = encoded.split('<br>')[0];
		decoded = decoded.replace(/&amp;/g,'&');
		decoded = decoded.replace(/&lt;/g,'<');
		decoded = decoded.replace(/&gt;/g,'>');
		return decoded;
	}

	conversationList(){
		console.log('in conversation list');
		console.log(this.props.conversations);
		if(!(this.props.conversations.length === 0)){

			const navLinkStyle = {
				boxSizing: 'border-box',
				display:'block',
				paddingLeft : 12,
				display: 'flex',
				height: 64, 
				width : '100%',				
				textDecoration: 'none',
				fontSize:'16px',
				color: 'white',
				fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'

			}
			const listStyle = {
				padding:0,
				margin:0,
				listStyleType: 'none',
				width : '100%',

			}
			const avatarStyle = {
				borderRadius: '50%',
				width: '50px',
				height:'50px',
				objectFit: 'cover',
				display: 'inline-block'
			}
			const nameStyle ={
				textOverflow : 'ellipsis',
				flex: 1,
				whiteSpace: 'nowrap',
				overflow:'hidden'

			}
			const nameTimeStyle = {
				display: 'flex',
			}
			const conversationInfoStyle = {
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				flex:1,
				paddingRight:12,
				minWidth: 0,
			}
			const messageStyle = {
				textOverflow : 'ellipsis',
				whiteSpace: 'nowrap',
				overflow:'hidden',

			}
			const imageWrapperStyle = {
				display:'flex',
				alignItems: 'center',
				marginRight: 12
			}
			var chosenConversationId = null;
			chosenConversationId = this.props.recipientConversationId ? this.props.recipientConversationId[this.props.conversationData.chosenId]:null;
			const dayMap= {0:'Sun',1:'Mon',2:'Tue',3:'Wed',4:'Thr',5:'Fri',6:'Sat'}
			const monthMap = {0:'Jan',1:'Feb',2:'Mar',3:'Apr',4:'May',5:'Jun',6:'Jul',7:'Aug',8:'Sep',9:'Oct',10:'Nov',11:'Dec'}
			const decoder = this.decoder;
			const user = this.props.user;
			return (
				<div>
 					<ul style = {listStyle}>{
 						this.props.conversations.map(function(conversation){
							var navLinkDisplayStyle = window.innerWidth>=480 && chosenConversationId && conversation.conversation._id === chosenConversationId? {...navLinkStyle,backgroundColor:'black'}:navLinkStyle;
							var participant = conversation.conversation.participants.filter(participant => participant._id!=user._id);
							var now = new Date();
							var createdTime = new Date(conversation.message[0].createdAt);
							var displayTime = getTime.getTimeConversationList(conversation.message[0].createdAt);
							return(
								<li style = {{width : '100%'}} key = {conversation.conversation._id} >
									<NavLink style = {navLinkDisplayStyle}  to = {`/recipient/${participant[0]._id}`} >
										
										<div style = {imageWrapperStyle}>
											<img style = {avatarStyle} src = {participant[0].avatarURL}></img>
										</div>
										<div style = {conversationInfoStyle}>
											<div style={nameTimeStyle}>
												<span style = {nameStyle}>{participant[0].name}</span>
												<span>{displayTime}</span>
											</div> 
											<div style = {messageStyle}>
												{conversation.message[0].author._id === user._id ? 
													'You' : conversation.message[0].author.name}: {decoder(conversation.message[0].body)}
											</div>
										</div>
									</NavLink>
								</li>
							)
						})
					}
					</ul>
				</div>
			)
		}
	}

	keyUpHandler(e){
		e.preventDefault();
		var keyWord = e.currentTarget.value;
		console.log(keyWord);
		console.log('timeoutId'+this.state.timeoutId);
		clearTimeout(this.state.timeoutId);
		var timeoutId = setTimeout(this.props.searchUser, 500,keyWord);
		console.log(timeoutId);
		this.setState({timeoutId:timeoutId});

	}

	insertKeyWord(e){
		console.log('insertKeyWord!!!!!!!!!!!!!!!!!!!!!!');
		e.preventDefault();
		this.setState({keyWord:e.target.value});
	}

	clickSearchUser(){
		this.props.clearSearch();
		this.setState({keyWord:''});
		console.log('click searchBoxStyle');
		console.log(this.input);
		this.input.value ='';
	}


	searchedUsersList(){


		const avatarStyle = {
			borderRadius: '50%',
			width: '50px',
			height:'50px',
			objectFit: 'cover',
			display: 'inline-block'
		}

		const listItemStyle = {
			display : 'flex',
			alignItems:'center'
		}

		const nameStyle ={
			textOverflow : 'ellipsis',
			flex: 1,
			whiteSpace: 'nowrap',
			overflow:'hidden'

		}
		const nameTimeStyle = {
			display: 'flex',
		}
		const conversationInfoStyle = {
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'center',
			flex:1,
			paddingRight:12,
			minWidth: 0,
		}
		const imageWrapperStyle = {
			display:'flex',
			alignItems: 'center',
			marginRight: 12
		}

		const navLinkStyle = {
			boxSizing: 'border-box',
			display:'block',
			paddingLeft : 12,
			display: 'flex',
			height: 64, 
			width : '100%',				
			textDecoration: 'none',
			fontSize:'16px',
			color: 'white',
			fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif'

		}

		const userName= {}

		if(this.props.searchedUsers.length !==0){
			return this.props.searchedUsers.map(user=>{
				return (
					<div style = {listItemStyle} key = {user._id}>
							<NavLink style = {navLinkStyle} to = {`/recipient/${user._id}`} onClick = {this.clickSearchUser} >
								<div style = {imageWrapperStyle}>
									<img src = {user.avatarURL} style = {avatarStyle}></img>
								</div>
								<div style = {conversationInfoStyle}>
									<div style={nameTimeStyle}>
										<span style = {nameStyle}>{user.name}</span>
									</div> 
								</div>
							</NavLink>
					</div>
					)
			}) 
		}
	}

	render(){
		const searchBoxStyle = {
			padding: '12px 12px',
			border: 0,


		}
		const searchBarStyle = {
			height:'30px',
			width: '100%',
			backgroundColor: 'red',
			padding: '0 28px',
			borderRadius: '5px',
			borderStyle: 'none'
		}
		const searchedUsersListStyle = {
			display: this.state.keyWord === '' ? 'none': 'block',
			width : '100%'
		}

		const conversationListStyle = {
			display: this.state.keyWord === '' ? 'block': 'none',
			width : '100%'
		}

		return(
			<div style = {{flex:1,display:'flex',flexDirection:'column', height :'100vh', width:'100%'}}>
						
				<div style = {searchBoxStyle}>
					<input ref = {(el)=>{this.input = el}} style ={searchBarStyle} type = 'search'  onChange = {(e)=>{this.insertKeyWord(e)}} onKeyUp = {(e) =>this.keyUpHandler(e)}></input>				
				</div>
											
				<div style = {{flex:1, backgroundColor:'blue',overflowY:'scroll'}}>
					<div style = {searchedUsersListStyle}>
						{this.searchedUsersList()}
						{this.props.user._id}
						{this.props.user.name}
						
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>						
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>

					</div>
					<div style = {conversationListStyle}>
						{this.conversationList()}
						
						{this.props.user.name}
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						hi<br></br>
						
					</div>
				</div>
			</div>
		)


	}
}
function mapStateToProps(state) {  
    return { 
    	conversations: state.conversations, 
    	conversationData:state.conversationData,
    	searchedUsers:state.searchedUsers,
    	recipientConversationId: state.recipientConversationId,  
    	user: state.user};
}
	
export default connect(mapStateToProps, actions)(ConversationColumn);
 