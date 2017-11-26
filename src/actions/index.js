import {LOAD_RECIPIENTS, LOAD_CONVERSATIONS } from './type'

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
			console.log(json.conversations);
			console.log('load conversations here!!');
			dispatch({type: LOAD_CONVERSATIONS , conversations: json.conversations});
		})
		.catch(err=>{
			console.log(err);
		});
	}
}


 