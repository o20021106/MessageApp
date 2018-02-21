import ConversationColumn from './conversationColumn';
import ChatWindow from './chatWindow';
import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from '../../actions/index';
import Radium from 'radium';

class Nearby extends React.Component{	

	constructor(props){
		super(props);	
	    this.state = {chatWindowDisplay:{display:'none'}};
	    this.chatWindowDisplayChange = this.chatWindowDisplayChange.bind(this);
	    this.getLocation = this.getLocation.bind(this);
	}

	componentDidMount(){
		if(typeof(navigator) !== 'undefined'){
			this.getLocation()
			.then(position=>
				{	actions.updateGeolocation(position);
					//this.props.print('i am here here i am');
					console.log('get position!!!!!!!!!!!!!');
					console.log(position);}
			)
			.catch(error=>{
				console.log(error)
			});
		}
	}

	chatWindowDisplayChange(show){
		if(show && window.innerWidth >= 480){
			this.setState({chatWindowDisplay:{display:'block'}});	
		}
		else{
			this.setState({chatWindowDisplay:{display:'none'}});
		}
	}

	getLocation() {
		function showError(error,resolve) {
    		switch(error.code) {
        		case error.PERMISSION_DENIED:
            		console.log("User denied the request for Geolocation.")
            		resolve(undefined);
            		break;
        		case error.POSITION_UNAVAILABLE:
            		console.log("Location information is unavailable.")
            		break;
        		case error.TIMEOUT:
            		console.log("The request to get user location timed out.")
            		break;
        		case error.UNKNOWN_ERROR:
            		console.log("An unknown error occurred.")
            		break;
    }
} 

		return new Promise(function (resolve, reject) {
	    	if (navigator.geolocation) {
	    		//http://ip-api.com/json/208.80.152.201
	    		alert('navigator');
	        	navigator.geolocation.getCurrentPosition(function(position){resolve([position.coords.longitude, position.coords.latitude])}, showError((value)=>resolve(value)));
	    	} else { 
	        	alert("geolocation information unavalable");
	    	}	
	    })
	}

	getCoordinates(position) {
		console.log('position in');
    	var currentLatitude = position.coords.latitude;
    	var currentLongitude = position.coords.longitude; 

    	return position;
	    //alert(currentLongitude+" and "+currentLatitude);
	}

	showError(error) {
    	switch(error.code) {
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

	render(){

		const outerStyle = {
			display: 'flex',
			flex:1,
			minWidth:0
		}

		const conversationColumnStyle = {
			display : 'none',
			
			'@media (min-width: 480px)':{
				display : 'block',
				maxWidth:240,
			}
		}
		const chatWindowStyle = {
			backgroundColor: 'orange',
			display:'none',
			'@media (min-width : 480px)':{
				backgroundColor: 'green',
				height: 300,
				width: 240,
				position:'fixed',
				right:50,
				bottom:0,
				zIndex:1
			}
		}
		const nearbyStyle = {
			flex:1,
			backgroundColor:'blue'
		}

		return (
			<div style = {outerStyle}>
				<div style = {conversationColumnStyle}>
					<ConversationColumn onChatWindowDisplayChange = {this.chatWindowDisplayChange}/>
				</div>
				<div style = {nearbyStyle}>
				nearby
				</div>
				<div style = {[chatWindowStyle, this.state.chatWindowDisplay]}>
					<ChatWindow onChatWindowDisplayChange = {this.chatWindowDisplayChange}/>
				</div>
			</div>	
		)
	}

}

function mapStateToProps(state) {  
    return { user:state.user, recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(Radium(Nearby));
