'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _reactDom = require('react-dom');

var _reactRedux = require('react-redux');

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _socketClient = require('../src/socketClient');

var _socketClient2 = _interopRequireDefault(_socketClient);

var _nearbyReducer = require('../src/reducers/nearbyReducer');

var _nearbyReducer2 = _interopRequireDefault(_nearbyReducer);

var _socketMiddleware = require('../src/socketMiddleware');

var _socketMiddleware2 = _interopRequireDefault(_socketMiddleware);

var _chatTemplate = require('../src/templates/chatTemplate');

var _chatTemplate2 = _interopRequireDefault(_chatTemplate);

var _server = require('react-dom/server');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

var _StaticRouter = require('react-router-dom/StaticRouter');

var _StaticRouter2 = _interopRequireDefault(_StaticRouter);

var _routes = require('../src/components/nearby/routes');

var _routes2 = _interopRequireDefault(_routes);

var _reactRouterConfig = require('react-router-config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var chatController = require('../controllers/chat.js');

exports.nearby = {
	get: function get(req, res) {

		var loadData = new Promise(function (resolve, reject) {
			chatController.getConversationsPre(req, resolve, reject);
		});
		loadData.then(function (conversations) {
			console.log('got conversations');
			//res.json({c:conversations});
			var context = {};
			var user = req.user;
			var radiumProp = { radiumConfig: { userAgent: req.headers['user-agent'] } };
			//let preloadedStateTemp = { user }
			var socket = new _socketClient2.default();

			conversations.conversations.sort(function (a, b) {
				if (a.message[0].createdAt > b.message[0].createdAt) {
					return -1;
				}
				if (a.message[0].createdAt < b.message[0].createdAt) {
					return 1;
				}
				return 0;
			});

			var recipientConversationId = {};

			conversations.conversations.forEach(function (conversation) {
				var userId = conversation.conversation.participants.filter(function (participant) {
					return participant._id.toString() !== user._id.toString();
				})[0]._id;

				if (!recipientConversationId.hasOwnProperty(userId)) {
					recipientConversationId[userId] = conversation.conversation._id;
				}
			});

			var preloadedState = _extends({}, _nearbyReducer.initial, { user: user, recipientConversationId: recipientConversationId }, conversations);
			//console.log(preloadedState)
			var createStoreWithMiddleWare = (0, _redux.applyMiddleware)((0, _socketMiddleware2.default)(socket), _reduxThunk2.default)(_redux.createStore);
			var store = createStoreWithMiddleWare(_nearbyReducer2.default, preloadedState);
			var html = (0, _server.renderToString)(_react2.default.createElement(
				_reactRedux.Provider,
				{ store: store },
				_react2.default.createElement(
					_radium.StyleRoot,
					{ style: { height: '100%' }, radiumConfig: { userAgent: req.headers['user-agent'] } },
					_react2.default.createElement(
						_StaticRouter2.default,
						{ location: req.url, context: context },
						(0, _reactRouterConfig.renderRoutes)(_routes2.default)
					)
				)
			));
			console.log('html!!!!!!!!!!!!!!!');
			console.log(html);
			var finalState = store.getState();
			//console.log('!!!!!!!!!!!!!!!!!!!!!!!!');
			//console.log(finalState);
			//console.log('!!!!!!!!data')
			//console.log(conversations);
			//console.log(nearbyTemplate(html, finalState,radiumProp));
			res.send((0, _chatTemplate2.default)(html, finalState, radiumProp, 'nearbyBundle'));
		}).catch(function (err) {
			console.log(err);
			console.log('got error in catch');
			res.json({ err: 'got error in catch' });
		});
	}
};
