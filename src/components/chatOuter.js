import React from 'react';
import ReactDOM from 'react-dom';

import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import ChatFrame from './chatFrame';
import socketClient from '../socketClient';
import rootReducer from '../reducers/chatReducer';
import configureStore from '../configureStore';
import socketMiddleware from '../socketMiddleware';
import {LOAD_CONVERSATIONS} from '../actions/type';
import {StyleRoot} from 'radium';

const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__
const radium_prop = window.__RADIUM_PROP__

// Allow the passed state to be garbage-collected
delete window.__RADIUM_PROP__

const socket = new socketClient();
socket.connect();

const createStoreWithMiddleWare = applyMiddleware(socketMiddleware(socket), thunkMiddleware)(createStore);
const store = createStoreWithMiddleWare(rootReducer,preloadedState);
console.log(store);

ReactDOM.render(
  <Provider store={store} >
  	<StyleRoot>
		<ChatFrame {...radium_prop}/>    
	</StyleRoot>
  </Provider>,
  document.getElementById('root')
)

