import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import ChatWindowTest from './chatWindow';
import Messages from './messages';
import io from 'socket.io-client';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import Radium from 'radium';




 

class Chat extends React.Component{	
	constructor(props){
		super(props);
		this.state = {recipientId: '', messageBuffer:'asdfadsfasdf', timeoutId: null};
		//this.userList = this.userList.bind(this);

	}
	componentWillMount(){
		this.props.loadConversations();
		//this.props.loadRecipients();
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
		var ChatWindow = Radium(ChatWindowTest);
		return (
				//{JSON.parse(localStorage.getItem("user")).name}
				<Router>
					<div style = {{height:'100vh', display:'flex'}}>
						
						<Route exact path= '/message' component = {Messages} />
						<Route path= '/recipient/:recipientId' component = {ChatWindowTest}/>
						<Route path= '/conversation/:conversationId'component = {ChatWindowTest}/>
					</div>
				</Router>	
)
	}

 	
}





function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers};
}
	
export default connect(mapStateToProps, actions)(Chat);
 


