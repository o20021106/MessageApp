import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import socketClient from '../src/socketClient';
import rootReducer from '../src/reducers/chatReducer';
import socketMiddleware from '../src/socketMiddleware';
import chatTemplate from '../src/templates/chatTemplate';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Radium from 'radium';
import {StyleRoot} from 'radium';
import StaticRouter from 'react-router-dom/StaticRouter';
import routes from '../src/components/nearby/routes';
import { matchRoutes, renderRoutes } from 'react-router-config';
import { initial } from '../src/reducers/chatReducer';

var chatController = require('../controllers/chat.js');


exports.nearby = {
	get: function(req,res){

		var loadData = new Promise((resolve, reject)=>{
			chatController.getConversationsPre(req, resolve,reject);
		})
		loadData.then((conversations)=>{
			console.log('got conversations');
			//res.json({c:conversations});
			let context = {};
			const user = req.user;
	  		let radiumProp = { radiumConfig:{userAgent: req.headers['user-agent']}};
			//let preloadedStateTemp = { user }
			const socket = new socketClient();

			let preloadedState = {...initial, user,...conversations};
			//console.log(preloadedState)
			const createStoreWithMiddleWare = applyMiddleware(socketMiddleware(socket), thunkMiddleware)(createStore);
			const store = createStoreWithMiddleWare(rootReducer,preloadedState);
			const html = renderToString(
				<Provider store={store} >
					<StyleRoot style = {{height:'100%'}} radiumConfig={{userAgent: req.headers['user-agent']}}>
						<StaticRouter location={req.url} context={context}>
	      					{renderRoutes(routes)}
	    				</StaticRouter>
					</StyleRoot> 
				</Provider>);
			console.log('html!!!!!!!!!!!!!!!');
			console.log(html);
			var finalState = store.getState();
			//console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
			//console.log(finalState);
			//console.log('!!!!!!!!data')
			//console.log(conversations);
			//console.log(nearbyTemplate(html, finalState,radiumProp));
			res.send(chatTemplate(html, finalState,radiumProp,'nearbyBundle'));
		})
		.catch((err)=>{
			console.log(err);
			console.log('got error in catch');
			res.json({err:'got error in catch'})
		})

	}
}
