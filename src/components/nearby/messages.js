import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from '../../actions/index';
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
				console.log('in conversation')
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
		if(typeof(window) === 'undefined'){
			console.log('undefined!!!!!!!!!!!')
			return <ConversationColumn/>
		}
		else if(window.innerWidth>=960 & this.props.conversations.length!=0){
			console.log('width>=960 IN TEST');
			console.log(this.props.conversations);
			var recipient=this.props.conversations[0].conversation.participants.filter(participant => participant._id!==this.props.user._id);
			return <Redirect to = {`/message/recipient/${recipient[0]._id}`} />
		}
		else{
			return <ConversationColumn/>		
		}
	}

}

function mapStateToProps(state) {  
    return { user:state.user, recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(Messages);
