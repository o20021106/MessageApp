/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider } from 'react-redux';
import {fetchPost} from './actions/action.js';
import fetch from 'isomorphic-fetch';

/*
function mapStateToProp(state){
	return{blogPosts : state.blogPosts}
}

*/ 

export default class Chat extends React.Component{	
	constructor(props){
		super(props);
		this.state = {users:[], message :'', toId:''};
		this.recipientChosen = this.recipientChosen.bind(this);
		this.newMessage = this.newMessage.bind(this);
		this.sendMessage = this.sendMessage.bind(this);
	}
	componentWillMount(){
		this.getRecipients();

	}
	getRecipients(){
		fetch("/getRecipients",
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'Authorization' : localStorage.getItem("token")
		    },
		    method: "GET",
		})
		.then(function(response) {
		    return response.json();
		})
		.then(json=>{
			console.log(json.users);
			this.setState({users:json.users});
			this.setState({love:json.users[0]._id});
		})
		.catch(err=>{
			console.log(err);
		});
	}

	userList(){
		if(this.state.length == 0){
			console.log('why??');
			return 'empty'
		}
		else{
			console.log('here');
			return this.state.users.map(user=>(<option key = {user._id} value = {user._id}>{user.name}</option>));
		}
	}

 	newMessage(e){
 		
 		this.setState({message:e.target.value})
 		console.log(this.state.message);
 	}
	
	recipientChosen(e){
		this.setState({toId: e.target.value})
	}
	sendMessage(e){
		e.preventDefault();
		fetch('/newMessage',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'Authorization' : localStorage.getItem("token"),

		    },
		    method: "POST",
		    body: JSON.stringify({recipient:this.state.toId, composedMessage:this.state.message})
		})
		.then(function(response) {
		    console.log(response);
		})

	}

 
	render(){

		return (
			<div>
				<form onSubmit = {(e) => this.sendMessage(e)}>
				 	<select name="recipient" onChange = {e=>this.recipientChosen(e)}>
					    {this.userList()}
				  	</select>
				  	<input type = 'text' name = 'composedMessage' onChange = {(e) => this.newMessage(e)}></input>
				  	<input type="submit" value="Submit"></input>
				</form> 
			</div>)
	}

	
}




//export default connect(mapStateToProp)(App);