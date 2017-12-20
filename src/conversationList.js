import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from './actions/index';
import {BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

class ConversationList extends React.Component{	

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


		return(<div>

			{this.conversationList()}

			
		</div>)
	}
}

function mapStateToProps(state) {  
    return { conversations: state.conversations};
}
	
export default connect(mapStateToProps, actions)(ConversationList);
 