import React from 'react';
import {connect} from 'react-redux';
import Chat from './chat';

class ChatFrame extends React.Component{	

    componentDidMount(){
        this.props.dispatch(
            {
                type: 'socket',
                promise: function(socket,next){
                    console.log('on connection new message listener');
                    return socket.on('newMessage',function(data){
                        console.log('callback recieve new message');
                        next({type:'RECIEVE_NEW_MESSAGE', message: data.message, chosenId:data.chosenId, conversationType:data.conversationType,});
                    });
                }
            }); 

        this.props.dispatch(
            {
                type: 'socket',
                promise: function(socket,next){
                    console.log('on connection new conversation listener');
                    return socket.on('NEW_CONVERSATION',function(data){
                        console.log('callback recieve new conversation');
                        next({type:'NEW_CONVERSATION', ...data});
                    });
                }
            });
    }
	render(){
		return <Chat />
	}
}
 
function mapStateToProps(state) {
    return {...state};
}

export default connect(mapStateToProps)(ChatFrame);
 