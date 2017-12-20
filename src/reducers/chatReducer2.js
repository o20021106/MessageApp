import {LOAD_RECIPIENTS,
	LOAD_CONVERSATIONS, 
	CHOSEN_CONVERSATION, 
	CHOSEN_CONVERSATION_MESSAGES,
	LOAD_CONVERSATIONS_SOCKET,
	UPDATE_CONVERSATION_MESSAGES,
	NEW_CONVERSATION,
	UPDATE_RECIPIENT,
	CHOSEN_CONVERSATION_AND_MESSAGES,
	CONVERSATION_BY_RECIPIENT,
	CHOSEN_RECIPIENT,
	CONVERSATION_MESSAGES,
	RECIEVE_NEW_MESSAGE,
	CLEAR_SEARCH,
	LOAD_SEARCH_USER } from '../actions/type.js';

const initial = {
	recipients:[], 
	recipientConversationId:{}, 
	searchedUsers:[],
	conversations:[], 

	conversationData: {conversationType: null, chosenId: null, messages:[]},

	chosenConversation:null, 
	currentConversation:[],
	currentConversationId:null, 
	latestRecipient:null};


export default function(state = initial, action){
	switch (action.type){
		case LOAD_RECIPIENTS:
		console.log('load recipients re');
		console.log(action);
			var recipientConversationId = {}
			action.recipients.forEach(function(recipient){
				if (recipient._id in recipientConversationId & state.recipientConversationId[recipient._id]){
					recipientConversationId[recipient._id] = state.recipientConversationId[recipient._id]
				}
				else{
					recipientConversationId[recipient._id] = recipient.conversationId;
				}
			})	
			return {...state, recipients : action.recipients, recipientConversationId:recipientConversationId};
			break;
		case LOAD_CONVERSATIONS:
			console.log('load conversations');
			console.log(action.conversations);  
			return {...state, conversations : action.conversations};
			break;
		case LOAD_SEARCH_USER:
			return {...state, searchedUsers:action.users}
		case CLEAR_SEARCH:
			return {...state, searchedUsers:[]}
		case CHOSEN_RECIPIENT:
			console.log('in chosen recipient');
			var conversationData = Object.assign({},state.conversationData);
			conversationData.conversationType = 'RECIPIENT';
			conversationData.chosenId = action.recipientId;
			conversationData.messages = [];
			console.log(conversationData); 
			return {...state, conversationData:conversationData};
		case CONVERSATION_MESSAGES:
			console.log('in conversation messages here');
		    	console.log(action);
		    	console.log(state.conversationData);
		    if (state.conversationData.conversationType === action.conversationType &
		    	state.conversationData.chosenId === action.recipientId){
		    	console.log('in');
		    	console.log(action);
		    	console.log(state.conversationData);
				var conversationData = Object.assign({},state.conversationData);
		    	conversationData.messages = action.messages;
		    	console.log(conversationData);
		    	return {...state, conversationData: conversationData}
		    }
		case RECIEVE_NEW_MESSAGE: 
			console.log('recieve new message');
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
			console.log(state.conversationData.chosenId);
 			console.log(action.chosenId);
 			console.log(state.conversationData.conversationType);
 			console.log(action.conversationType);
			if(action.chosenId.indexOf(state.conversationData.chosenId) !== -1 &
				action.conversationType === state.conversationData.conversationType){
				console.log('return is the same as current');
				var conversationData = Object.assign({},state.conversationData);
				var messages= state.conversationData.messages.slice();
				messages.push(action.message.message[0]);
				conversationData.messages = messages;
				console.log(messages);
				console.log(conversationData);
				return {...state, conversationData:conversationData, conversations: conversations}	
			}
			else{ 
				return {...state, conversations: conversations}	
			}
			break;

		case NEW_CONVERSATION:
			console.log('in new conversation');
			console.log(action.payload);

			var conversationData = Object.assign({},state.conversationData);

			//var currentConversation = state.currentConversation;
			var conversations = state.conversations.slice();
			var recipientConversationId = Object.assign({}, state.recipientConversationId);
			var userId = action.chosenId.filter(id => id!= JSON.parse(localStorage.getItem("user"))._id)[0];
			recipientConversationId[userId]=action.payload.conversation._id;
			conversations.push({message: [action.payload.message],conversation:action.payload.conversation});

			if (conversations.length === 0){
				console.log('in new conversation if 1');
				conversationData.messages.push(action.payload.message);
				conversationData.chosenId = action.userId;
				conversationData.conversationType = aciton.conversationType;
				//var chosenConversation = action.payload.conversation._id;
				//var latestRecipient = null;
				//conversations.push({message: [action.payload.message],conversation:action.payload.conversation});
				

			}

			//conversations.push({message: [action.payload.message],conversation:action.payload.conversation});
			console.log(conversations);
//			var latestRecipient = state.latestRecipient;
			console.log('------------------');
			console.log(userId);
			console.log(conversationData.chosenId);
			console.log(action.conversationType);
			console.log(conversationData.conversationType);

			if(conversationData.chosenId === userId & conversationData.conversationType === action.conversationType){
				console.log('in iffffff'); 
				console.log(userId);
				console.log(conversationData.chosenId);
				conversationData.messages.push(action.payload.message);
			}

			return {	...state, 
						conversations:conversations, 
						conversationData,
						recipientConversationId:recipientConversationId 
					}
			
			
			break;

		case CONVERSATION_BY_RECIPIENT:
			console.log('get just one conversation by recipient id');
			var conversationData = Object.assign({},state.conversationData);
			var recipientConversationId = Object.assign({}, state.recipientConversationId);
			var conversations = state.conversations.slice();
			console.log(conversations);
			console.log(action);
			console.log(state.conversationData.chosenId);
			console.log(action.chosenId);
			if (action.conversationType === 'RECIPIENT'){
				if (!state.recipientConversationId[action.chosenId]){
						console.log('in first if');
						recipientConversationId[action.chosenId] = action.conversationId;
				}	
				if(action.conversationId){
					console.log('conversationId exist');
					
					if(state.conversationData.chosenId === action.chosenId){
						console.log('second');
						console.log(action.payload);
						conversationData.messages = conversationData.messages.concat(action.payload.message);
					}
					var exist = false;
					console.log('before c-b-r conversation');
					console.log(conversations);
					console.log(action.conversationId);
					var conversationNew = Object.assign({},action.payload);
					conversationNew.message = [conversationNew.message[0]];
					if(conversations.length !== 0){
						conversations = conversations.map(conversation=>{
							if(conversation.conversation._id === action.conversationId){
								conversation.message = conversationNew;
								exist = true;
							}
							console.log(conversation);
							return conversation
						});}
					console.log(exist);
					if(!exist){
						console.log('not exist');
						conversations.push(conversationNew);
					}
					console.log(conversations);

					return {...state, 
						conversationData:conversationData, 
						conversations:conversations, 
						recipientConversationId:recipientConversationId}				
				
				}
				else {
					recipientConversationId[action.chosenId] =null;
					return {...state, recipientConversationId:recipientConversationId}
				}


			}
			else{
				return state;
			}

			break;
		default:
			return state;
	}
}