import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
//import Chat from './src/chat';
//import ChatWindow from './src/chatWindow';
import ChatFrame from './src/chatFrame';
import socketClient from './src/socketClient';
import rootReducer from './src/reducers/chatReducer2';
import configureStore from './src/configureStore';
import socketMiddleware from './src/socketMiddleware';
import {LOAD_CONVERSATIONS} from './src/actions/type';
import {StyleRoot} from 'radium';


const socket = new socketClient();
socket.connect();

const createStoreWithMiddleWare = applyMiddleware(socketMiddleware(socket), thunkMiddleware)(createStore);
/*
import io from 'socket.io-client';
const socket = io();
socket.emit('event','love',function(response){console.log(resoponse)});
*/
//const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleWare(rootReducer);



class Chatroom extends React.Component{

	render(){
		return (
			<Provider store = {store}>
				<StyleRoot>
					<ChatFrame />
				</StyleRoot>
			</Provider>
		)
	}
}

ReactDOM.render(<Chatroom />, document.getElementById('root'));
