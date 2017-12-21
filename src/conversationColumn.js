import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import ChatWindowTest from './chatWindowTest';
import io from 'socket.io-client';
import {  BrowserRouter as Router,
  Route,
  Link,
  NavLink
} from 'react-router-dom';
import { Redirect } from 'react-router';

class ConversationColumn extends React.Component{	

	constructor(props){
		super(props);
		this.state = {timeoutId: null, showConversations: true, keyWord:''};
		this.keyUpHnadler = this.keyUpHnadler.bind(this);
		this.insertKeyWord = this.insertKeyWord.bind(this);
	}


	conversationList(){
		console.log('in conversation');
		if(!(this.props.conversations.length === 0)){

			const listItemStyle = {
				display:'block',
				padding : '12px 12px'
			}

			return (
				<div>
					<ul>{
						this.props.conversations.map(function(conversation){
							var participant = conversation.conversation.participants.filter(participant => participant._id!=JSON.parse(localStorage.getItem("user"))._id);
							return(
								<li style = {listItemStyle} key = {conversation.conversation._id} >
									<NavLink to = {`/recipient/${participant[0]._id}`} >
										<div>
											participant: {participant[0].name}
										</div> 
										<div>
											{conversation.message[0].auther}
											{conversation.message[0].body}
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

	keyUpHnadler(e){
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



	searchedUsersList(){
		console.log('here in searched user');
		console.log(this.props.searchedUsers);
		


		const avatarStyle = {
			borderRadius: '50%',
			width: '50px',
			height:'50px',
			objectFit: 'cover',
			display: 'inline-block'
		}

		const listItemStyle = {
			padding : '12px 12px',
			display : 'flex',
			alignItems:'center'
		}

		const userInfromationStyle = {
			flex: 1,
			paddingLeft: '12px'
		}

		const linkStyle = {
			color:'white',
			textDecoration: 'none'
		}



		if(this.props.searchedUsers.length !==0){
			return this.props.searchedUsers.map(user=>{
				return (
					<div style = {listItemStyle} key = {user._id}>
						<img src = {user.avatarURL} style = {avatarStyle}></img>
						<div style = {userInfromationStyle}>	
							<NavLink style = {linkStyle} to = {`/recipient/${user._id}`} onClick = {this.props.clearSearch} >
								{user.name}
							</NavLink>
						</div>
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
			display: this.state.keyWord === '' ? 'none': 'block'
		}

		const conversationListStyle = {
			display: this.state.keyWord === '' ? 'block': 'none'
		}




		return(
			<div style = {{flex:1,display:'flex',flexDirection:'column', height :'100vh'}}>
						
				<div style = {searchBoxStyle}>
					<input style ={searchBarStyle} type = 'search'  onChange = {(e)=>{this.insertKeyWord(e)}} onKeyUp = {(e) =>this.keyUpHnadler(e)}></input>				
				</div>
							
						
				<div style = {{flex:1, backgroundColor:'blue',overflowY:'scroll'}}>
					<div style = {searchedUsersListStyle}>
						{this.searchedUsersList()}
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
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(ConversationColumn);
 