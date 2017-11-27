/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import {connect} from 'react-redux';
import Chat from './chat';
import ChatWindow from './chatWindow';

class ChatFrame extends React.Component{	

	render(){

		return (
			<div>
				<Chat />
				<ChatWindow />
			</div>)
	}

 	
}

export default connect()(ChatFrame);
 