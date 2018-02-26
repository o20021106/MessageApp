import ConversationColumn from './conversationColumn';
import ChatWindow from './chatWindow';
import Profile from './profile';
import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from '../../actions/index';
import Radium from 'radium';
import testStyle from './testing.css';
class Nearby extends React.Component{	

	constructor(props){
		super(props);	
	    this.state = {chatWindowDisplay:{display:'none'},profileDisplay:{display:'none'},
	    	nearbyUser:{},nearbyScroll:{overflowY:'scroll'}};
	    this.chatWindowDisplayChange = this.chatWindowDisplayChange.bind(this);
	    this.profileDisplayChange = this.profileDisplayChange.bind(this);
	    this.clickNearbyUser = this.clickNearbyUser.bind(this);
	    this.nearbyUsersList = this.nearbyUsersList.bind(this);
	    this.getLocation = this.getLocation.bind(this);
	    this.hideOnclickOutSide = this.hideOnclickOutSide.bind(this);
	    this.closeProfile = this.closeProfile.bind(this);
	}

	componentDidMount(){
		if(typeof(navigator) !== 'undefined'){
			this.getLocation()
			.then(position=>
				{	
					actions.updateGeolocation(position);
					//this.props.print('i am here here i am');

				}
			)
			.catch(error=>{
				console.log(error)
			});
		}
		this.props.getNearbyUsers();
	}

	chatWindowDisplayChange(show){
		if(show && window.innerWidth >= 480){
			this.setState({chatWindowDisplay:{display:'block'}});	
		}
		else{
			this.setState({chatWindowDisplay:{display:'none'}});
		}
	}	

	profileDisplayChange(show){
		if(show){
			this.setState({profileDisplay:{display:'flex'}});	
		}
		else{
			this.setState({profileDisplay:{display:'none'}});
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
	        	navigator.geolocation.getCurrentPosition(function(position){resolve([position.coords.longitude, position.coords.latitude])}, 
	        		function(error){if (error.code === error.PERMISSION_DENIED){resolve(undefined)}});
	    	} else { 
	        	console.log("geolocation information unavalable");
	    	}	
	    })
	}

	getCoordinates(position) {
		console.log('position in');
    	var currentLatitude = position.coords.latitude;
    	var currentLongitude = position.coords.longitude; 

    	return position;
	}

	clickNearbyUser(nearbyUser){
		this.profileDisplayChange(true);
		this.setState({nearbyUser:nearbyUser});
		//lock scroll
		this.setState({nearbyScroll:{overflowY:'hidden'}, nearbyBlur:{filter:'blur(5px)'}});
		//const listener = utility.hideOnClickOutside('.profile', this.profile,()=>alert('you'));
	}

	hideOnclickOutSide(e){
		e.preventDefault();
		if(!e.target.closest('.profile')){
			if(this.state.profileDisplay.display == 'flex'){
				this.setState({profileDisplay:{display:'none'},nearbyScroll:{overflowY:'scroll'},nearbyBlur:{filter:'blur(0px)'}});
			}
		}
	}

	closeProfile(){
		console.log('inclick profile close');
		if(this.state.profileDisplay.display == 'flex'){
				this.setState({profileDisplay:{display:'none'},nearbyScroll:{overflowY:'scroll'},nearbyBlur:{filter:'blur(0px)'}});
		}
	}

	nearbyUsersList(){

		var clickNearbyUser = this.clickNearbyUser;
		
		const nameStyle ={
			textOverflow : 'ellipsis',
			flex: 1,
			whiteSpace: 'nowrap',
			overflow:'hidden'

		}

		return this.props.nearbyUsers.map(nearbyUser=>{
			let distance = typeof(nearbyUser.dis !== 'undefined')? nearbyUser.dis: '';
			let backgroundStyle = {
				backgroundImage : `url("${nearbyUser.avatarURL}")`,
				backgroundSize:'cover',
				overflow:'hidden'
			}
			const squareWrapper = {
					width:'calc(100%/3)',
					paddingBottom:'calc(100%/3)',
					height:0,
					cursor: 'pointer',
					position:'relative',
					overflow:'hidden',			
					'@media (min-width: 480px)':{
						width:'calc(100%/6)',
						paddingBottom:'calc(100%/6)',
					}
			}

			const squareItem = {
				position:'absolute',
				top:0,
				left:0,
				width:'100%',
				height:'100%',
				display:'flex',
				alignItems:'flex-end',
				padding:'10px',
				boxSizing:'border-box'
			}
			return( <div key = {nearbyUser._id} style= {[squareWrapper,backgroundStyle]} onClick ={()=>clickNearbyUser(nearbyUser)}>
				<div style = {squareItem}>
					<span style = {nameStyle}>
						{nearbyUser.name}
					</span>
				</div>
			</div>)
		})			
		/*let distance = typeof(nearbyUser.dis !== 'undefined')? nearbyUser.dis: '';
			let backgroundStyle = {
				backgroundImage : `url("${nearbyUser.avatarURL}")`,
				backgroundSize:'cover',
				overflow:'hidden'
			}
			return( <div key = {nearbyUser._id} className = {testStyle.squareWrapper} onClick ={()=>clickNearbyUser(nearbyUser)}>
				<div className = {testStyle.squareItem} style = {backgroundStyle}>
					<span style = {nameStyle}>
						{nearbyUser.name}
					</span>
				</div>
			</div>)
		})
		*/
		/*
		var userNames = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
		let backgroundStyle = {
				backgroundImage : `url("http://res.cloudinary.com/iping/image/upload/v1513696701/ktalox4sncdwrqfqpwf6.jpg")`,
				backgroundSize:'cover'
			}
		return userNames.map(userName=>{
			return (<div key = {userName} className = {testStyle.squareWrapper} onClick ={()=>clickNearbyUser()}>
				<div className = {testStyle.squareItem} style = {backgroundStyle}>
					{userName}
				</div>
			</div>)
		})
		*/


			
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
			zIndex:1,
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
				zIndex:2
			}
		}
		const nearbyStyle = {
			flex:1,
			backgroundColor:'blue',
			minWidth:0,
			position:'relative'


		}

		const profileStyle = {
			width:'100%',
			position:'absolute', 
			top:0, 
			'@media (min-width: 480px)':{
				width:'80%', 
				position:'absolute', 
				top:'100px', 
				paddingBottom:'100px'
			}
		};

		return (
			<div style = {outerStyle}>
				<div style = {conversationColumnStyle}>
					<ConversationColumn onChatWindowDisplayChange = {this.chatWindowDisplayChange}/>
				</div>
				<div style = {nearbyStyle}>
					<div onClick = {(e)=>this.hideOnclickOutSide(e)} ref = {(el)=>{this.profile = el}} style={[{zIndex:1, overflowY: 'scroll',width:'100%', height:'100%', position:'absolute', justifyContent:'center',alignItems:'center'}, this.state.profileDisplay]}>
						<div  className ='profile' style = {profileStyle}>
							<div style = {{width:'100%',backgroundColor:'white'}}>
								<Profile nearbyUser = {this.state.nearbyUser} onCloseProfile = {this.closeProfile} onChatWindowDisplayChange = {this.chatWindowDisplayChange}/>
							</div>
						</div>
					</div>
					<div className = {testStyle.container} style = {[this.state.nearbyBlur, this.state.nearbyScroll]}>
						{this.nearbyUsersList()}hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
                    hi<br></br>
					</div>
				</div>	
				<div style = {[chatWindowStyle, this.state.chatWindowDisplay]}>
					<ChatWindow onChatWindowDisplayChange = {this.chatWindowDisplayChange}/>
				</div>
			</div>	
		)
	}

}

function mapStateToProps(state) {  
    return { user:state.user, recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers, nearbyUsers: state.nearbyUsers };
}
	
export default connect(mapStateToProps, actions)(Radium(Nearby));
			//		<div style={{float:'left', zIndex:1, width:100, height:100, backgroundColor:'white'}}>
			//			infront
			//		</div>