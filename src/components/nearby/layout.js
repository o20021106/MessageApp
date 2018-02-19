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
			height:35,
			backgroundColor: 'black',
			'@media (min-width : 480px)':{
				height:100,
				backgroundColor: 'red'}
				
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
				<div style = {navbarStyle}>red</div>
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

