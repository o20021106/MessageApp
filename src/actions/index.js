import {LOAD_RECIPIENTS, 
	LOAD_CONVERSATIONS, 
	CHOSEN_CONVERSATION_AND_MESSAGES,
	CHOSEN_CONVERSATION, 
	CHOSEN_CONVERSATION_MESSAGES, 
	UPDATE_RECIPIENT ,
	CONVERSATION_BY_RECIPIENT,
	CHOSEN_RECIPIENT,
	CONVERSATION_MESSAGES,
	LOAD_SEARCH_USER,
	CLEAR_SEARCH,
	UPDATE_NEARBY_USERS} from './type'



export function loadRecipients(){
	return function(dispatch){
		fetch("/getRecipients",
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      //'Authorization' : localStorage.getItem("token")
		    },
		    credentials: 'same-origin',
		    method: "GET",
		})
		.then(function(response) {
		    return response.json();
		})
		.then(json=>{
			console.log(json.users);
			console.log('load recipients here!!');
			dispatch({type: LOAD_RECIPIENTS, recipients: json.users, conversationType: 'RECIPIENT'});
		})
		.catch(err=>{
			console.log(err);
		});


	}
}

export function setChosenRecipient(recipientId, conversationId, status){
    return function(dispatch){
    	console.log(recipientId);
    	console.log('in set chosenRecipient!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    	var convExist = 'CON_EXIST';
		var conNExist = 'CON_N_EXIST';
		var notLoaded = 'NOT_LOADED';

    	dispatch({type:CHOSEN_RECIPIENT, recipientId: recipientId});
 		
 		switch (status){
			case convExist:
				getConversationByConId(recipientId,conversationId, dispatch);
				break;
			case conNExist:
				break;
			case notLoaded:
				getConversationByReId(recipientId,dispatch, 'RECIPIENT');
				break;
    }
}


function getConversationByConId(recipientId, conversationId, dispatch){
	fetch("/getConversation/"+conversationId,
		{
			headers: {
		      'Accept': 'application/json', 
		      'Content-Type': 'application/json',
		      //'Authorization' : localStorage.getItem("token")
		    },
		    credentials: 'same-origin',
		    method: "GET",
		})
		.then(function(response) {
		    return response.json();
		})
		.then(json=>{
			//console.log('messages');			
			//console.log(json);
			//console.log('load curruent conversations here!!');
			dispatch({type: CONVERSATION_MESSAGES , 
				messages: json.conversation, 
				conversationId: conversationId, 
				recipientId:recipientId,
				conversationType: 'RECIPIENT'});
			return json;
		})
		.catch(err=>{
			console.log(err);
		});
}


function getConversationByReId(recipientId, dispatch, conversationType){
		fetch("/getConversationByRecipientId/"+recipientId,
			{
				headers: {
			      'Accept': 'application/json', 
			      'Content-Type': 'application/json',
			      //'Authorization' : localStorage.getItem("token")
			    },
			    credentials: 'same-origin',
			    method: "GET",
			})
			.then(function(response) {
			    return response.json();
			})
			.then(json=>{
				console.log('return conversation by recipientId');
				console.log(json);
				if(json.status){
					//no existing conversation
					dispatch({type: CONVERSATION_BY_RECIPIENT, 
						conversationId: null, 
						chosenId: recipientId,
						conversationType: conversationType});
				}
				else{
					//conversation already exists
					console.log(json);
					dispatch({type: CONVERSATION_BY_RECIPIENT, 
						conversationId: json.conversation._id, 
						payload: json, 
						chosenId: recipientId,
						conversationType: conversationType});
				}
			})
			.catch(err=>{
				console.log(err);
			});
	}
}



















/*
export function setChosenConversation(conversationId){
    return function(dispatch){
    	console.log('in set chosenConversation!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    	dispatch({type:CHOSEN_CONVERSATION, chosenConversation: conversationId});
    	getCurrentConversation(conversationId, dispatch);
    }
}
*/
/*
export function setLatestRecipient(){
    return {type:UPDATE_RECIPIENT, latestRecipient: null}
}
*/
export function loadConversations(){
	return function(dispatch){
		fetch("/getConversations",
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      //'Authorization' : localStorage.getItem("token")
		    },
		    credentials: 'same-origin',
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
/*		.then(function(json){
			//console.log(json.conversations[0].conversation._id);
			//console.log('load conversatjion id')
			dispatch({type:CHOSEN_CONVERSATION, chosenConversation: json.conversations[0].conversation._id});
			//getCurrentConversation(json.conversations[0].conversation._id, dispatch);

		})*/
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
		      //'Authorization' : localStorage.getItem("token")
		    },
		    credentials: 'same-origin',
		    method: "GET",
		})
		.then(function(response) {
		    return response.json();
		})
		.then(json=>{
			//console.log('messages');			
			//console.log(json);
			//console.log('load curruent conversations here!!');
			dispatch({type: CHOSEN_CONVERSATION_MESSAGES , currentConversation: json.conversation, currentConversationId: conversationId});
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
		      //'Authorization' : localStorage.getItem("token")
		    },
		    credentials: 'same-origin',
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

export function newMessageSocket(conversationType, recipientId, composedMessage, conversationId){
	return {
		type: 'socket',
        promise: function(socket,next){
    	console.log('inside socket here');
    	return socket.emit('newMessage',{composedMessage:composedMessage, conversationId:conversationId,recipientId:recipientId, conversationType: conversationType});
    	}
	}
}

export function newConversationSocket(conversationType, composedMessage, recipientId){
	console.log('in new conversation socket');
	return {
		type: 'socket',
		promise: function(socket, next){
			console.log('creating new conversation action creator');
			console.log(recipientId);
			return socket.emit('newConversation', {composedMessage: composedMessage, recipientId:recipientId, conversationType:conversationType})
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
			      //'Authorization' : localStorage.getItem("token")
			    },
			    credentials: 'same-origin',
			    method: "GET",
			})
			.then(function(response) {
			    return response.json();
			})
			.then(json=>{
				console.log('return conversation by recipientId');
				console.log(json);
				if(json.status){
					//no existing conversation
					dispatch({type: CONVERSATION_BY_RECIPIENT, chosenConversation: null, latestRecipient:recipientId});
				}
				else{
					//conversation already exists
					dispatch({type: CONVERSATION_BY_RECIPIENT, chosenConversation: json.conversationId, messages: json.conversation});
				}
			})
			.catch(err=>{
				console.log(err);
			});
	}
}
 
export function searchUser(keyWord){
	return function(dispatch){
		if (keyWord === ''){
			console.log('emptystring');
			return 	dispatch({type: LOAD_SEARCH_USER, users:[]});

		}
		dispatch({type: LOAD_SEARCH_USER, users:[]});
		fetch(`/searchUser?keyword=${keyWord}`,
			{
				headers: {
			      'Accept': 'application/json', 
			      'Content-Type': 'application/json',
			    },
			    credentials: 'same-origin',
			    method: "GET"

			})
		.then(function(response) {
		    return response.json();
		})
		.then(json =>{
			console.log(json);
			if(json.users){
				dispatch({type: LOAD_SEARCH_USER, users:json.users});
			}
		})
		.catch(err=>{
			console.log(err);
		});

	}
}

export function clearSearch(){
	return {type:CLEAR_SEARCH }
}

export function updateGeolocation(position){
	fetch('updateGeolocation',
		{
			headers: {
		    	'Accept': 'application/json', 
		    	'Content-Type': 'application/json',
			},
		    credentials: 'same-origin',
		    method: "POST",
			body: JSON.stringify({coordinates: position})
		}
	)
	.then(function(response) {
		console.log(response);
		console.log('response');
	    return response.json();
	})
	.then(json=>{console.log(json)})
}

export function getNearbyUsers(){
	return function(dispatch){
		console.log('in function');
		fetch(`/getNearbyUsers`,
			{
				headers: {
			      'Accept': 'application/json', 
			      'Content-Type': 'application/json',
			    },
			    credentials: 'same-origin',
			    method: "GET"
			})
		.then(function(response) {
		    return response.json();
		})
		.then(json =>{
			console.log(json);
			if(json.users && !json.locAvailable){
				dispatch({type: UPDATE_NEARBY_USERS, users:json.users});
			}
			else if(json.users && json.locAvailable){
				const users = json.users.map((user)=>{
					var temp = user.obj;
					temp.dis = user.dis;
					return temp;
				});
				dispatch({type: UPDATE_NEARBY_USERS, users:users});
			}
			else if(json.err){
				console.log(json.err);
			}
		})
		.catch(err=>{
			console.log(err);
		});
	}
}
/*
export function getNearbyUsers(){
	console.log('in get nearby user function index');
}
*/