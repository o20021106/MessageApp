import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';

class Profile extends React.Component{


    render(){
        return(<div>
                <div>
                    <img src={this.props.nearbyUser.avatarURL} style = {{width:'80%', margin:'auto'}}></img>
                    {this.props.nearbyUser.name}
                    {this.props.nearbyUser.role}
                    {this.props.nearbyUser.height}
                    {this.props.nearbyUser.weight}
                </div>
            </div>)
        
    }
}




function mapStateToProps(state) {
    return { 
    	conversationData : state.conversationData,
    	user:state.user
    }
}
	
export default connect(mapStateToProps)(Radium(Profile));
 