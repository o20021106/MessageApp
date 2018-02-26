import React from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../actions/index';
import Radium from 'radium';
import { renderRoutes } from 'react-router-config';


class Layout extends React.Component{ 
	/*static fetchData(store) {
    	return store.dispatch(actions.loadConversations());
  	}
  	  componentDidMount() {
		this.props.loadConversations();
  	}*/
  	componentDidMount(){

  		console.log('layout!!!!!!!!!!!!!!!!!!didmount');
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
		const navbarStyle = {
			height:40,
			display:'flex',
			backgroundColor: 'black',
			zIndex:1,justifyContent:'space-evenly',
				padding:'0 30px',
			'@media (min-width : 480px)':{
				justifyContent:'flex-end',
				padding:'0 50px',
				}
				
			}
		const buttonStyle = {
			margin:'auto 0',
			padding:'0 10px',
			color:'blue',
			':hover': {
     			 color:'orange'
    		},
    		cursor:'pointer'
		}
		const layoutStyle = {
			height: '100%',
			display:'flex',
			flexDirection: 'column'

		}
		const  pageStyle= {
			minHeight:0,
			flex: 1,
			display: 'flex'			
		}
		console.log('in layout');
		
		return(
			<div style = {layoutStyle}>
				<div style = {navbarStyle}>
					<div style={buttonStyle} key = 'user'>
  						<i className="fa fa-user fa-2x fa-fw" onClick = {()=>{window.location.href = 'https://'+window.location.host+'/editProfile'}}></i>
					</div>
					<div style={buttonStyle} key = 'messages' onClick = {()=>{window.location.href = 'https://'+window.location.host+'/message/messages'}}>
  						<i className="fa fa-comments-o fa-2x fa-fw"></i>
					</div>
					<div style={buttonStyle} key = 'users'>
						<i className="fa fa-map-marker fa-2x fa-fw" onClick = {()=>{window.location.href = 'https://'+window.location.host+'/nearby'}}></i>
					</div>
				</div>
				<div style = {pageStyle}>
					{renderRoutes(this.props.route.routes)}
				</div>
			</div>
		);
	}

}

function mapStateToProps(state) {
    return {...state};
}

export default connect(mapStateToProps)(Radium(Layout));

