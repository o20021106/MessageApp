import React from 'react';
import ReactDOM from 'react-dom';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import socketClient from '../../socketClient';
import rootReducer from '../../reducers/chatReducer';
import socketMiddleware from '../../socketMiddleware';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import {  BrowserRouter } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';
import routes  from './routes';

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
//console.log(store);
//console.log(radium_prop);
hydrate(
  <Provider store={store} >
  	<StyleRoot style = {{height:'100%'}} radiumConfig = {radium_prop.radiumConfig}>
		<BrowserRouter>
			{renderRoutes(routes)}
		</BrowserRouter>
	</StyleRoot>    
  </Provider>,
  document.getElementById('root')
)

