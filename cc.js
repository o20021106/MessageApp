import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import Chat from './src/chat'
import rootReducer from './src/reducers/chat_reducer';


const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleWare(rootReducer);

class Chatroom extends React.Component{
	render(){
		return (
			<Provider store = {store}>
				<Chat />
			</Provider>
		)
	}
}

/*
class Chatroom extends React.Component{
	render(){
		console.log('inchat room');

		return (
			<div>
				<Chat />
			</div>
		)
	}
}
*/
ReactDOM.render(<Chatroom />, document.getElementById('root'));
