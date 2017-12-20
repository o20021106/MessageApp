import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import ChatWindowTest from './chatWindowTest';
import Test from './test';
import io from 'socket.io-client';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';



 

class Chat extends React.Component{	
	constructor(props){
		super(props);
		this.state = {recipientId: '', messageBuffer:'asdfadsfasdf', timeoutId: null};
		//this.userList = this.userList.bind(this);

	}
	componentWillMount(){
		this.props.loadConversations();
		this.props.loadRecipients();
	}
/*
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

*/
	

    
	render(){
		window.onresize = function(e){alert('hi')};
		return (
			<div>
				{JSON.parse(localStorage.getItem("user")).name}
				<Router>
					<div>
						

						<Route exact path= '/message' component = {Test} />
						<Route path= '/recipient/:recipientId' component = {ChatWindowTest}/>
						<Route path= '/conversation/:conversationId'component = {ChatWindowTest}/>
					</div>
				</Router>	
			</div>)
	}

 	
}





function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers};
}
	
export default connect(mapStateToProps, actions)(Chat);
 


