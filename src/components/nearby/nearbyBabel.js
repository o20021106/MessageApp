'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversationColumn = require('./conversationColumn');

var _conversationColumn2 = _interopRequireDefault(_conversationColumn);

var _chatWindow = require('./chatWindow');

var _chatWindow2 = _interopRequireDefault(_chatWindow);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _index = require('../../actions/index');

var actions = _interopRequireWildcard(_index);

var _radium = require('radium');

var _radium2 = _interopRequireDefault(_radium);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var testStyle = {
	'testing': 'aab46387',
	'container': '_1e71b0c4',
	'squareWrapper': 'dd8a2fdb',
	'squareItem': '_8328854e'
};

var Nearby = function (_React$Component) {
	_inherits(Nearby, _React$Component);

	function Nearby(props) {
		_classCallCheck(this, Nearby);

		var _this = _possibleConstructorReturn(this, (Nearby.__proto__ || Object.getPrototypeOf(Nearby)).call(this, props));

		_this.state = { chatWindowDisplay: { display: 'none' } };
		_this.chatWindowDisplayChange = _this.chatWindowDisplayChange.bind(_this);
		_this.getLocation = _this.getLocation.bind(_this);
		return _this;
	}

	_createClass(Nearby, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			if (typeof navigator !== 'undefined') {
				this.getLocation().then(function (position) {
					actions.updateGeolocation(position);
					//this.props.print('i am here here i am');
					console.log('get position!!!!!!!!!!!!!');
					console.log(position);
				}).catch(function (error) {
					console.log(error);
				});
			}
			console.log('did mount before');
			this.props.getNearbyUsers();
			console.log('did mount after');
		}
	}, {
		key: 'chatWindowDisplayChange',
		value: function chatWindowDisplayChange(show) {
			if (show && window.innerWidth >= 480) {
				this.setState({ chatWindowDisplay: { display: 'block' } });
			} else {
				this.setState({ chatWindowDisplay: { display: 'none' } });
			}
		}
	}, {
		key: 'getLocation',
		value: function getLocation() {
			function showError(error, resolve) {
				switch (error.code) {
					case error.PERMISSION_DENIED:
						console.log("User denied the request for Geolocation.");
						resolve(undefined);
						break;
					case error.POSITION_UNAVAILABLE:
						console.log("Location information is unavailable.");
						break;
					case error.TIMEOUT:
						console.log("The request to get user location timed out.");
						break;
					case error.UNKNOWN_ERROR:
						console.log("An unknown error occurred.");
						break;
				}
			}

			return new Promise(function (resolve, reject) {
				if (navigator.geolocation) {
					//http://ip-api.com/json/208.80.152.201
					alert('navigator');
					navigator.geolocation.getCurrentPosition(function (position) {
						resolve([position.coords.longitude, position.coords.latitude]);
					}, function (error) {
						if (error.code === error.PERMISSION_DENIED) {
							resolve(undefined);
						}
					});
				} else {
					alert("geolocation information unavalable");
				}
			});
		}
	}, {
		key: 'getCoordinates',
		value: function getCoordinates(position) {
			console.log('position in');
			var currentLatitude = position.coords.latitude;
			var currentLongitude = position.coords.longitude;

			return position;
			//alert(currentLongitude+" and "+currentLatitude);
		}
	}, {
		key: 'nearbyUsersList',
		value: function nearbyUsersList() {
			/*
   	return this.props.nearbyUsers.map(nearbyUser=>{
   	let distance = typeof(nearbyUser.dis !== 'undefined')? nearbyUser.dis: '';
   	let backgroundStyle = {
   		backgroundImage : `url("${nearbyUser.avatarURL}")`,
   		backgroundSize:'cover'
   	}
   	return <div key = {nearbyUser._id} className = {testStyle.squareWrapper}>
   		<div className = {testStyle.squareItem} style = {backgroundStyle}>
   			{nearbyUser.name} dist {distance}
   		</div>
   	</div>
   })
   */
			var userNames = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33];
			var backgroundStyle = {
				backgroundImage: 'url("http://res.cloudinary.com/iping/image/upload/v1513696701/ktalox4sncdwrqfqpwf6.jpg")',
				backgroundSize: 'cover'
			};
			return userNames.map(function (userName) {
				return _react2.default.createElement(
					'div',
					{ key: userName, className: testStyle.squareWrapper },
					_react2.default.createElement(
						'div',
						{ className: testStyle.squareItem, style: backgroundStyle },
						userName
					)
				);
			});
		}
	}, {
		key: 'showError',
		value: function showError(error) {
			switch (error.code) {
				case error.PERMISSION_DENIED:
					console.log("User denied the request for Geolocation.");
					break;
				case error.POSITION_UNAVAILABLE:
					console.log("Location information is unavailable.");
					break;
				case error.TIMEOUT:
					console.log("The request to get user location timed out.");
					break;
				case error.UNKNOWN_ERROR:
					console.log("An unknown error occurred.");
					break;
			}
		}
	}, {
		key: 'render',
		value: function render() {

			var outerStyle = {
				display: 'flex',
				flex: 1,
				minWidth: 0
			};

			var conversationColumnStyle = {
				display: 'none',

				'@media (min-width: 480px)': {
					display: 'block',
					maxWidth: 240
				}
			};
			var chatWindowStyle = {
				backgroundColor: 'orange',
				display: 'none',
				'@media (min-width : 480px)': {
					backgroundColor: 'green',
					height: 300,
					width: 240,
					position: 'fixed',
					right: 50,
					bottom: 0,
					zIndex: 1
				}
			};
			var nearbyStyle = {
				flex: 1,
				backgroundColor: 'blue'

			};

			return _react2.default.createElement(
				'div',
				{ style: outerStyle },
				_react2.default.createElement(
					'div',
					{ style: conversationColumnStyle },
					_react2.default.createElement(_conversationColumn2.default, { onChatWindowDisplayChange: this.chatWindowDisplayChange })
				),
				_react2.default.createElement(
					'div',
					{ className: testStyle.container },
					this.nearbyUsersList()
				),
				_react2.default.createElement(
					'div',
					{ style: [chatWindowStyle, this.state.chatWindowDisplay] },
					_react2.default.createElement(_chatWindow2.default, { onChatWindowDisplayChange: this.chatWindowDisplayChange })
				)
			);
		}
	}]);

	return Nearby;
}(_react2.default.Component);

function mapStateToProps(state) {
	return { user: state.user, recipients: state.recipients, conversations: state.conversations, searchedUsers: state.searchedUsers, nearbyUsers: state.nearbyUsers };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, actions)((0, _radium2.default)(Nearby));
