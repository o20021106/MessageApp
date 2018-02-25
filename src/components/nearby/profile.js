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

        const profileOuterStyle= {
            width :'100%',
            padding: 15,
            boxSizing: 'border-box'

        };
        const closeStyle = {
            display:'flex',
            justifyContent:'flex-end'
        };

        const buttonStyle = {
            color:'green',
            ':hover': {
                 color:'orange'
            },
            cursor:'pointer'
        };

        return(<div style = {profileOuterStyle}>
                <div style = {closeStyle}>
                    <div key = 'close' style = {buttonStyle} onClick = {()=>this.props.onCloseProfile()}>
                        <i className="far fa-times-circle fa-lg"></i>
                    </div>
                </div>

                <div>
                    <div key = 'talk' style = {buttonStyle} onClick = {()=>this.chatWithUser()} >
                        <i className="far fa-comment-alt fa-lg"></i>
                    </div>
                <div>
                </div>
                    <img src={this.props.nearbyUser.avatarURL} style = {{width:'100%', margin:'auto'}}></img>
                    {this.props.nearbyUser.name}<br/>
                    {this.props.nearbyUser.role}<br/>
                    {this.props.nearbyUser.height}<br/>
                    {this.props.nearbyUser.weight}<br/>
                    {this.props.nearbyUser.aboutMe}<br/>
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
 