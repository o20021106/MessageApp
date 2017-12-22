import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from './actions/index';
import SearchUser from './searchUser';
import ConversationList from './conversationList';
import {BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import ConversationColumn from './conversationColumn';




 

class Messages extends React.Component{	

	conversationList(){
		console.log('in conversation');
		if(!(this.props.conversations.length === 0)){
			console.log('inside inside');
			console.log(this.props.conversations);
			return this.props.conversations.map(function(conversation){
				console.log('listing !!!!!!!!')
				console.log(conversation.conversation.participants[0]._id);
				console.log(localStorage.getItem('user')._id);
				var participant = conversation.conversation.participants.filter(participant => participant._id!=JSON.parse(localStorage.getItem("user"))._id);
				console.log(localStorage.getItem("user"));
				
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


	render(){

		console.log('in test');
		if(window.innerWidth>=960 & this.props.conversations.length!=0){
			console.log('width>=960 IN TEST');
			console.log(this.props.conversations.length);
			console.log('screen width >= 960');
			console.log(this.props.conversations[0].conversation.participants);
			var recipient=this.props.conversations[0].conversation.participants.filter(participant => participant._id!==JSON.parse(localStorage.getItem('user'))._id);
			return <Redirect to = {`/recipient/${recipient[0]._id}`} />
		}
		else{
			return <ConversationColumn/>		
		}
	}

}
/*
<SearchUser/>
				<ConversationList/>
*/
function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(Messages);
 /*
 return(<div style = {{flex:1,display:'flex',flexDirection:'column', height :'100vh'}}>
				<div style = {{height:'50px'}}>height</div>
				<div style = {{flex:2, backgroundColor:'red',overflowY:'scroll'}}>hi</div>
				<div style = {{flex:1, backgroundColor:'blue',overflowY:'scroll'}}>
				<p>
				
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
								hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				hi
				<br></br>
				</p>
				</div>
			</div>)
 */