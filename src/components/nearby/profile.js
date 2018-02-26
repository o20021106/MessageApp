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
                this.props.recipientConversationId[this.props.nearbyUser._id], conStatus, this.props.nearbyUser);
        }
        else{
            window.location.href = `https://${window.location.host}/message/recipient/${this.props.nearbyUser._id}`;
        }
    }

    chooseConversation(recipientId, conversationId, conStatus, recipient){
        this.props.onChatWindowDisplayChange(true);
        if(recipientId !== this.props.conversationData.chosenId){
            this.props.setChosenRecipientNearby(recipientId, conversationId, conStatus, recipient);
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

        infoList.push(typeof(this.props.nearbyUser.dis !== 'undefined')? ['distance',`${Math.round(this.props.nearbyUser.dis)} m`]: null);
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
            
            position:'fixed',
            right: 30,
            bottom:30,
            color:'green',
            width:45,
            height:45,
            backgroundColor:'red',
            borderRadius:'50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            ':hover': {
                 color:'orange'
            },
            cursor:'pointer',
            '@media (min-width: 480px)':{
                position:'absolute',
                right: 15,
                top:15,
                background: 'transparent',
                width:'auto',
                height:'auto',
                bottom:'auto'
            }
        };
        const chatButtonStyleSmall = {
            
            position:'fixed',
            right: 30,
            bottom:100,
            color:'green',
            width:45,
            height:45,
            backgroundColor:'red',
            borderRadius:'50%',
            display:'flex',
            justifyContent:'center',
            alignItems:'center',
            cursor:'pointer',
            ':hover': {
                 color:'orange'
            },
            '@media (min-width: 480px)':{
                display:'none'
            }
        };

        const chatButtonStyleBig = {
            display:'none',
            backgroundColor:'lightblue',
            color:'white',                
            textAlign:'center',
            padding:10,
            cursor:'pointer', 
            borderRadius: 3,
            width:'100%',
            boxSizing: 'border-box',
            ':hover': {
                 backgroundColor:'darkblue'
            },
            '@media (min-width: 480px)':{
                display:'block'
            }
        };

        const contentStyle = {
            display:'block',
            '@media (min-width: 480px)':{
                display:'flex'
            }
        }
        const imageStyle ={
            '@media (min-width: 480px)':{
                flex:'3 3 1px'
            }
        }

        const profileInfoStyle = {
            '@media (min-width: 480px)':{
                flex:'2 2 1px',
                paddingLeft:30
            }
        }

        const nameStyle ={
            textOverflow : 'ellipsis',
            flex: 1,
            whiteSpace: 'nowrap',
            overflow:'hidden'

        }


        return(<div style = {profileOuterStyle}>
                    <div key = 'close' style = {buttonStyle} onClick = {()=>this.props.onCloseProfile()}>
                        <i className="fa fa-times"></i>
                    </div>
                    <div key = 'chat' style = {chatButtonStyleSmall} onClick = {()=>this.chatWithUser()}>
                        <i className="fa fa-comment fa-lg"></i>
                    </div> 
                    <div style = {contentStyle}>

                        <div style = {imageStyle}>
                            <img src={this.props.nearbyUser.avatarURL} style = {{width:'100%', margin:'auto'}}></img>
                        </div>
                        <div style={profileInfoStyle}>  
                                <div style={nameStyle}>
                                    {this.props.nearbyUser.name}
                                </div>
                               {this.userInfoDidsplay()}
                                <div style = {chatButtonStyleBig} onClick = {()=>this.chatWithUser()}>
                                        CHAT
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
 