import {LOAD_RECIPIENTS, LOAD_CONVERSATIONS, CHOSEN_CONVERSATION, CHOSEN_CONVERSATION_MESSAGES } from './type'

export function loadRecipients(){
	return function(dispatch){
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
			console.log('load recipients here!!');
			dispatch({type: LOAD_RECIPIENTS, recipients: json.users});
		})
		.catch(err=>{
			console.log(err);
		});


	}
}

export function loadConversations(){
	return function(dispatch){
		fetch("/getConversations",
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
			//console.log(json.conversations);
			//console.log('load conversations here!!');
			dispatch({type: LOAD_CONVERSATIONS , conversations: json.conversations});
			return json;
		})
		.then(function(json){
			//console.log(json.conversations[0].conversation._id);
			//console.log('load conversatjion id')
			dispatch({type:CHOSEN_CONVERSATION, chosenConversation: json.conversations[0].conversation._id});
			getCurrentConversation(json.conversations[0].conversation._id, dispatch);

		})
		.catch(err=>{
			console.log(err);
		});
	}
}

function getCurrentConversation(conversationId, dispatch){
	fetch("/getConversation/"+conversationId,
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
			//console.log('messages');			
			//console.log(json);
			//console.log('load curruent conversations here!!');
			dispatch({type: CHOSEN_CONVERSATION_MESSAGES , currentConversation: json.conversation});
			return json;
		})
		.catch(err=>{
			console.log(err);
		});
}

export function loadConversationsSocket(){
  return {
    type: 'socket',
    promise: function(socket){
    	console.log('inside socket here for loadConversations');
    	return socket.emit('loadConversationsSocket','momomomomo~~~~~~~~~~~~~~');
    }
  }

}

export function loadCurrentConversation(conversationId){
	return function(dispatch){
		fetch("/getConversation/"+conversationId,
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
			//console.log('messages');			
			//console.log(json);
			//console.log('load conversations here!!');
			dispatch({type: CHOSEN_CONVERSATION_MESSAGES , currentConversation: json.conversation});
			return json;
		})
		.catch(err=>{
			console.log(err);
		});
	}
}

