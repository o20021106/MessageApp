import {LOAD_RECIPIENTS,
	LOAD_CONVERSATIONS, 
	CHOSEN_CONVERSATION, 
	CHOSEN_CONVERSATION_MESSAGES,
	LOAD_CONVERSATIONS_SOCKET,
	UPDATE_CONVERSATION_MESSAGES,
	NEW_CONVERSATION,
	UPDATE_RECIPIENT
	} from '../actions/type.js';

const initial = {recipients:[1234], conversations:[], chosenConversation:'no one chosen', currentConversation:[], latestRecipient:null};


export default function(state = initial, action){
	switch (action.type){
		case LOAD_RECIPIENTS:
			return {...state, recipients : action.recipients};
			break;
		case LOAD_CONVERSATIONS:
			return {...state, conversations : action.conversations};
			break;
		case LOAD_CONVERSATIONS_SOCKET:
			return {...state, conversations : action.conversations};
			break;
		case CHOSEN_CONVERSATION:
			console.log('update chosen conversation here');
			return {...state, chosenConversation: action.chosenConversation};
			break;
		case CHOSEN_CONVERSATION_MESSAGES:
			return {...state, currentConversation: action.currentConversation};
		case UPDATE_CONVERSATION_MESSAGES:
			var currentConversation = state.currentConversation.slice();
			currentConversation.push(action.message[0]);
			return {...state, currentConversation:currentConversation}
		case NEW_CONVERSATION:
			console.log('in new conversation');
			var conversations = state.conversations.slice();
			conversations.push(action.payload);

			return {...state, conversations:conversations, latestRecipient:null}
		case UPDATE_RECIPIENT:
			return {...state, latestRecipient:action.recipientId}

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