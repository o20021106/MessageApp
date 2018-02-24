import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as actions from '../../actions/index';

class Profile extends React.Component{
    constructor(props){
        super(props);   
        this.chatWithUser = this.chatWithUser.bind(this);
        this.chooseConversation = this.chooseConversation.bind(this);

    }
    chatWithUser(){
        console.log('chatWithUser')
        console.log(this.props.nearbyUser._id);
        if(window.innerWidth>=480){
            console.log('larger than 480');
            var conStatus = !this.props.recipientConversationId[this.props.nearbyUser._id]?'CON_N_EXIST':'CON_EXIST';
            console.log(conStatus);
            this.chooseConversation(this.props.nearbyUser._id, 
                this.props.recipientConversationId[this.props.nearbyUser._id], conStatus);
        }
        else{
                        console.log('smaller than 480');
            window.location.href = `https://${window.location.host}/message/recipient/${this.props.nearbyUser._id}`;
        }
    }

    chooseConversation(recipientId, conversationId,conStatus){
        console.log('choose conversation');
        this.props.onChatWindowDisplayChange(true);
        if(recipientId !== this.props.conversationData.chosenId){
            this.props.setChosenRecipient(recipientId, conversationId, conStatus);
        }       
    }

    render(){
        return(<div>
                <div>
                    <div onClick = {()=>this.props.onCloseProfile()}>click to close profile</div>
                    <div onClick = {()=>this.chatWithUser()} >talk with me</div>
                    <img src={this.props.nearbyUser.avatarURL} style = {{width:'80%', margin:'auto'}}></img>
                    {this.props.nearbyUser.name}
                    {this.props.nearbyUser.role}
                    {this.props.nearbyUser.height}
                    {this.props.nearbyUser.weight}
                </div>
            </div>)
        
    }
}




function mapStateToProps(state){
    return { 
    	conversationData : state.conversationData,
    	user:state.user,
        recipientConversationId: state.recipientConversationId
    }
}
	
export default connect(mapStateToProps,actions)(Radium(Profile));
 