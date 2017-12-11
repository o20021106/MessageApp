import {LOAD_RECIPIENTS, LOAD_CONVERSATIONS, CHOSEN_CONVERSATION, CHOSEN_CONVERSATION_MESSAGES, UPDATE_RECIPIENT } from './type'

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


export function setChosenConversation(conversationId){
    return function(dispatch){
    	dispatch({type:CHOSEN_CONVERSATION, chosenConversation: conversationId});
    	getCurrentConversation(conversationId, dispatch);
    }
}

export function setLatestRecipient(){
    return {type:UPDATE_RECIPIENT, latestRecipient: null}
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

export function newMessageSocket(composedMessage, conversationId){
	return {
		type: 'socket',
        promise: function(socket,next){
    	console.log('inside socket here');
    	return socket.emit('newMessage',{composedMessage:composedMessage, conversationId:conversationId});
    	}
	}
}


export function newConversationSocket(composedMessage, recipientId){
	console.log('in new conversation socket');
	return {
		type: 'socket',
		promise: function(socket, next){
			console.log('creating new conversation action creator');
			console.log(recipientId);
			return socket.emit('newConversation', {composedMessage: composedMessage, recipientId:recipientId})
		}
	}

}

 

export function getConversationByRecipientId(recipientId){
	return function(dispatch){
		console.log('recipientId');
		console.log(recipientId);
		dispatch({type: UPDATE_RECIPIENT, latestRecipient: recipientId});

		fetch("/getConversationByRecipientId/"+recipientId,
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
				console.log('return conversation by recipientId');
				console.log(json);
				if(json.status){
					dispatch({type: CHOSEN_CONVERSATION, chosenConversation: null, latestRecipient:recipientId});
				}
				else{
					dispatch({type: CHOSEN_CONVERSATION, chosenConversation: json.conversationId, messages: json.conversation});
				}
			})
			.catch(err=>{
				console.log(err);
			});
	}
}