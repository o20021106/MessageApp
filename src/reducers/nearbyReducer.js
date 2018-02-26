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
	LOAD_SEARCH_USER,
	UPDATE_NEARBY_USERS } from '../actions/type.js';

export const initial = {
	user:{},
	nearbyUsers:[],
	recipients:[], 
	recipientConversationId:{}, 
	searchedUsers:[],
	conversations:[], 
	conversationData: {conversationType: null, chosenId: null, messages:[],userInfo:[], recipient:''},
	chosenConversation:null, 
	currentConversation:[],
	currentConversationId:null, 
	latestRecipient:null};


export default function(state = initial, action){
	switch (action.type){
		case 'test':
			return {...state, recipients:['ha']}
		case LOAD_CONVERSATIONS:

			action.conversations.sort(function(a,b){
				if (a.message[0].createdAt > b.message[0].createdAt){
					return -1
				}
				if (a.message[0].createdAt < b.message[0].createdAt){
					return 1
				}
				return 0
			})
			var recipientConversationId = Object.assign({}, state.recipientConversationId);

			action.conversations.forEach(function(conversation){
				var userId = conversation.conversation.participants.filter(id => id!= state.user._id)[0];
				if (!recipientConversationId.hasOwnProperty(userId)){
					recipientConversationId[userId] =  conversation.conversation._id;
				}

			});

			console.log('load conversations');
			console.log(action.conversations);  
			return {...state, conversations : action.conversations, recipientConversationId: recipientConversationId};
			break;
		case LOAD_SEARCH_USER:
			return {...state, searchedUsers:action.users}
		case CLEAR_SEARCH:
			return {...state, searchedUsers:[]}
		case UPDATE_NEARBY_USERS:
			console.log('update nearby users!!!!!!!!!!!!!!!');
			console.log(action.users);
			return {...state, nearbyUsers: action.users}
			break;
		case CHOSEN_RECIPIENT:
			console.log('in chosen recipient');
			var conversationData = Object.assign({},state.conversationData);
			conversationData.conversationType = 'RECIPIENT';
			conversationData.chosenId = action.recipientId;
			conversationData.messages = [];
			conversationData.recipient=action.recipient;
			console.log(conversationData); 
			return {...state, conversationData:conversationData};
		case CONVERSATION_MESSAGES:
		    if (state.conversationData.conversationType === action.conversationType &
		    	state.conversationData.chosenId === action.recipientId){
		    	console.log('in conversation  messages');
		    	console.log(state.conversationData);
				var conversationData = Object.assign({},state.conversationData);
		    	conversationData.messages = action.messages;
		    	conversationData.recipient = action.recipient;
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
				if (a.message[0].createdAt > b.message[0].createdAt){
					return -1
				}
				if (a.message[0].createdAt < b.message[0].createdAt){
					return 1
				}
				return 0
			})
			if(action.chosenId.indexOf(state.conversationData.chosenId) !== -1 &
				action.conversationType === state.conversationData.conversationType){
				var conversationData = Object.assign({},state.conversationData);
				var messages= state.conversationData.messages.slice();
				messages.push(action.message.message[0]);
				conversationData.messages = messages;
				return {...state, conversationData:conversationData, conversations: conversations}	
			}
			else{ 
				return {...state, conversations: conversations}	
			}
			break;

		case NEW_CONVERSATION:

			var conversationData = Object.assign({},state.conversationData);
			var conversations = state.conversations.slice();
			var recipientConversationId = Object.assign({}, state.recipientConversationId);
			var userId = action.chosenId.filter(id => id!= state.user._id)[0];
			recipientConversationId[userId]=action.payload.conversation._id;
			conversations.unshift({message: [action.payload.message],conversation:action.payload.conversation});

			if (conversations.length === 0){
				console.log('in new conversation if 1');
				conversationData.messages.push(action.payload.message);
				conversationData.chosenId = action.userId;
				conversationData.conversationType = aciton.conversationType;
			}

			if(conversationData.chosenId === userId & conversationData.conversationType === action.conversationType){
				console.log('in iffffff'); 
				console.log(userId);

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
			conversationData.recipient = action.recipient;
			if (action.conversationType === 'RECIPIENT'){
				if (!state.recipientConversationId[action.chosenId]){
						console.log('in first if');
						recipientConversationId[action.chosenId] = action.conversationId;
				}	
				if(action.conversationId){	
					if(state.conversationData.chosenId === action.chosenId){
						console.log('second if');
						conversationData.messages = conversationData.messages.concat(action.payload.message);
		//				conversationData.userInfo = action.payload.conversation.participants;
					}
					var exist = false;
					var conversationNew = Object.assign({},action.payload);

					conversationNew.message = [conversationNew.message[conversationNew.message.length-1]];
					console.log(conversationNew);

					if(conversations.length !== 0){
						conversations = conversations.map(conversation=>{
							console.log('here in conversation map');
							if(conversation.conversation._id === action.conversationId){
								conversation = conversationNew;
								exist = true;
							}
							console.log(conversation);
							return conversation
						});}
					if(!exist){
						console.log('not exist');
						conversations.unshift(conversationNew);
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