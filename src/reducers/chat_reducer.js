import {LOAD_RECIPIENTS,
	LOAD_CONVERSATIONS, 
	CHOSEN_CONVERSATION, 
	CHOSEN_CONVERSATION_MESSAGES,
	LOAD_CONVERSATIONS_SOCKET,
	UPDATE_CONVERSATION_MESSAGES,
	NEW_CONVERSATION,
	UPDATE_RECIPIENT
	} from '../actions/type.js';

const initial = {recipients:[1234], conversations:[], chosenConversation:null, currentConversation:[], latestRecipient:null};


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
			if (action.latestRecipient)
			{
				console.log('in action.latestRecipient');
				if(action.latestRecipient === state.latestRecipient){
					return {...state, chosenConversation: action.chosenConversation, currentConversation: []};	
				}
			}
			else if(action.messages){
				console.log('in action.messages else');
				console.log(action.messages);
				console.log(action.chosenConversation);
				return {...state, chosenConversation: action.chosenConversation, currentConversation: action.messages};	
			}
			else{
				console.log('in the rest');
				return {...state, chosenConversation: action.chosenConversation};	
			}
			break;
		case CHOSEN_CONVERSATION_MESSAGES:
			console.log('chosen conversation messages !!!!!!!!!!!!!!!!!!!!');
			console.log(action.currentConversation);
			return {...state, currentConversation: action.currentConversation};
			break;
		case UPDATE_CONVERSATION_MESSAGES:
			console.log('in update conversations');
			var conversations = state.conversations.slice();
			conversations = conversations.map(conversation=>{
				if(conversation.conversation._id === action.message.conversationId){
					conversation.message = action.message.message;
				}
				return conversation
			})

			conversations.sort(function(a,b){
				if (a.message[0].createdAt < b.message[0].createdAt){
					return -1
				}
				if (a.message[0].createdAt > b.message[0].createdAt){
					return 1
				}
				return 0
			})
			console.log('IDSSSSSS');
			console.log(state.currentConversation);
 			console.log(action.message.conversationId);
			if(action.message.conversationId === state.chosenConversation){
				console.log('return is the same as current');
				var currentConversation = state.currentConversation.slice();
				currentConversation.push(action.message.message[0]);
				console.log(currentConversation);
				return {...state, currentConversation:currentConversation, conversations: conversations}	
			}
			else{ 
				return {...state, conversations: conversations}	
			}
 

			var currentConversation = state.currentConversation.slice();
			currentConversation.push(action.message[0]);
			return {...state, currentConversation:currentConversation}
			break;
		case NEW_CONVERSATION:
			console.log('in new conversation');
			console.log(action.payload);
			var currentConversation = state.currentConversation;
			var conversations = state.conversations.slice();
			if (conversations.length === 0){
				currentConversation.push(action.payload.message);

				var chosenConversation = action.payload.conversation._id;
				var latestRecipient = null;
				conversations.push({message: [action.payload.message],conversation:action.payload.conversation});
				return {...state, conversations:conversations, 
					latestRecipient:latestRecipient, 
					chosenConversation: chosenConversation,
					currentConversation: currentConversation}
			

			}

			conversations.push({message: [action.payload.message],conversation:action.payload.conversation});
			console.log(conversations);
			var latestRecipient = state.latestRecipient;
			var chosenConversation = state.chosenConversation;

			if(latestRecipient === action.latestRecipient){
				console.log('in iffffff'); 
				console.log(action.latestRecipient);
				console.log(latestRecipient);
				latestRecipient = null
				chosenConversation = action.payload.conversation._id;
				currentConversation.push(action.payload.message);

			}
			return {...state, 
				conversations:conversations, 
				latestRecipient:latestRecipient, 
				chosenConversation: chosenConversation,
				currentConversation: currentConversation}
			break;
		case UPDATE_RECIPIENT:
			console.log('in update recipient');
			console.log(action.latestRecipient);
			console.log(state);
			return {...state, latestRecipient: action.latestRecipient}
			break;
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