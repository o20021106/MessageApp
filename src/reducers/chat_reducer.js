import {LOAD_RECIPIENTS,LOAD_CONVERSATIONS, CHOSEN_CONVERSATION, CHOSEN_CONVERSATION_MESSAGES} from '../actions/type.js';

const initial = {recipients:[1234], conversations:[], chosenConversation:'no one chosen', currentConversation:[]};


export default function(state = initial, action){
	switch (action.type){
		case LOAD_RECIPIENTS:
			return {...state, recipients : action.recipients};
			break;
		case LOAD_CONVERSATIONS:
			return {...state, conversations : action.conversations};
			break;
		case CHOSEN_CONVERSATION:
			console.log('update chosen conversation here');
			return {...state, chosenConversation: action.chosenConversation};
			break;
		case CHOSEN_CONVERSATION_MESSAGES:
			return {...state, currentConversation: action.currentConversation};
		default:
			return state;
	}
}

  
/*
export default function(state = initial, action){
	switch (action.type){
		case LOAD_RECIPIENTS:
			return {...state, recipients : action.recipients};
			break;
		case LOAD_CONVERSATIONS:
			return {...state, conversations : action.conversations};
			break;
		case CHOSEN_CONVERSATION:
			console.log('update chosen conversation here');
			return {...state, chosenConversation: action.chosenConversation};
			break;
		case CHOSEN_CONVERSATION_MESSAGES:
			return {...state, currentConversation: action.currentConversation};
		default:
			return state;
	}
}

*/    