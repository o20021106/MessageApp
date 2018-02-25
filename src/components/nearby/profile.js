import React from 'react';
import { connect } from 'react-redux';
import Radium from 'radium';
import * as actions from '../../actions/index';
import getTimeDisplay from '../../getTimeDisplay';

class Profile extends React.Component{
    constructor(props){
        super(props);   
        this.chatWithUser = this.chatWithUser.bind(this);
        this.chooseConversation = this.chooseConversation.bind(this);

    }
    chatWithUser(){
        if(window.innerWidth>=480){
            var conStatus = !this.props.recipientConversationId[this.props.nearbyUser._id]?'CON_N_EXIST':'CON_EXIST';
            this.chooseConversation(this.props.nearbyUser._id, 
                this.props.recipientConversationId[this.props.nearbyUser._id], conStatus);
        }
        else{
            window.location.href = `https://${window.location.host}/message/recipient/${this.props.nearbyUser._id}`;
        }
    }

    chooseConversation(recipientId, conversationId,conStatus){
        this.props.onChatWindowDisplayChange(true);
        if(recipientId !== this.props.conversationData.chosenId){
            this.props.setChosenRecipient(recipientId, conversationId, conStatus);
        }       
    }

    createMarkup(string) {
        return {__html: string};
    }

    aboutMeComponent(string) {
        return <div dangerouslySetInnerHTML={this.createMarkup(string)}/>
    }

    userInfoDidsplay(){
        var infoList = [];
        var user = this.props.nearbyUser;
        var age =  typeof(user.birthday)=== 'undefined'? undefined:getTimeDisplay.getAge(user.birthday);
        infoList.push(typeof(user.aboutMe) !== 'undefined'? ['aboutMe',`${user.aboutMe}`]: null);
        infoList.push(typeof(age) !== 'undefined'? ['age',`AGE ${age}`]: null);
        infoList.push(typeof(user.height) !== 'undefined'? ['height',`HEIGHT ${user.height} cm`]: null);
        infoList.push(typeof(user.weight) !== 'undefined'? ['weight', `WEIGHT ${user.weight} kg`]: null);
        infoList.push(typeof(user.role) !== 'undefined'? ['role',`ROLE ${user.role}`]: null);
        infoList = infoList.filter(item=> item!== null);
        return infoList.map((info)=>{
            if(info[0]=='aboutMe'){
                return (<div key = 'aboutMe'>{this.aboutMeComponent(info[1], 'aboutMe')}
                         <hr></hr>
                    </div>);
            }
            return (<div key = {info[0]}>
                {info[1]}
                <hr></hr>
            </div>)
        });
    }



    render(){

        const profileOuterStyle= {
            width :'100%',
            padding: 30,
            boxSizing: 'border-box'

        };


        const buttonStyle = {
            position:'absolute',
            right: 15,
            top:15,
            color:'green',
            ':hover': {
                 color:'orange'
            },
            cursor:'pointer'
        };

        const chatButtonStyle = {
            backgroundColor:'lightblue',
            textAlign:'center',
            padding:10,
            borderRadius:3,
            color:'white',
            ':hover': {
                 backgroundColor:'darkblue'
            },
            cursor:'pointer'
        };
        const contentStyle = {
            display:'flex'
        }

        return(<div style = {profileOuterStyle}>
                <div>
                    <div key = 'close' style = {buttonStyle} onClick = {()=>this.props.onCloseProfile()}>
                        <i className="far fa-times-circle fa-lg"></i>
                    </div>
                </div>

 
                <div style = {contentStyle}>

                    <div style = {{flex:'3 3 1px'}}>
                        <img src={this.props.nearbyUser.avatarURL} style = {{width:'100%', margin:'auto'}}></img>
                    </div>
                    <div style={{flex:'2 2 1px'}}>  
                        <div style = {{paddingLeft:30}}>
                            <div>
                                <h1 >{this.props.nearbyUser.name}</h1>
                            </div>
                            {this.userInfoDidsplay()}
                            <div style = {chatButtonStyle} onClick = {()=>this.chatWithUser()}>
                                    CHAT
                            </div>
                        </div>
                    </div>
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
 