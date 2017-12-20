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
		if(this.props.searchedUsers.length !==0){
			return this.props.searchedUsers.map(user=>{
				return (
					<div key = {user._id}>
						<img src = {user.avatarURL} width = '50'></img>
						<Link to = {`/recipient/${user._id}`} onClick = {this.props.clearSearch} >
							{user.name}
						</Link>
					</div>
					)
			}) 
		}
	}

	render(){
		return(
			<div>
				<input type = 'search' onKeyUp = {(e) =>this.keyUpHnadler(e)}></input>
				{this.searchedUsersList()}
			</div>
		)


	}
}
function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(SearchUser);
 