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
import { Redirect } from 'react-router';



 

class SearchUser extends React.Component{	

	constructor(props){
		super(props);
		this.state = {timeoutId: null};
		this.keyUpHnadler = this.keyUpHnadler.bind(this);
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
			padding : '12px 12px'
		}

		if(this.props.searchedUsers.length !==0){
			return this.props.searchedUsers.map(user=>{
				return (
					<div style = {listItemStyle} key = {user._id}>
						<img src = {user.avatarURL} style = {avatarStyle}></img>
						<Link to = {`/recipient/${user._id}`} onClick = {this.props.clearSearch} >
							{user.name}
						</Link>
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
		return(
			<div>
				<div style = {searchBoxStyle}>
					<input style ={searchBarStyle} type = 'search' onKeyUp = {(e) =>this.keyUpHnadler(e)}></input>
					
				</div>
				{this.searchedUsersList()}
			</div>
		)


	}
}
function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(SearchUser);
 