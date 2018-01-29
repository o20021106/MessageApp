import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index';
import {  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import Radium from 'radium';
import * as getTime from '../getTimeDisplay';

class Profile extends React.Component{


    render(){
        if(conversationData.chosenId ){
            return <div></div>    
        }
        
    }
}




function mapStateToProps(state) {
    return { 
    	conversationData : state.conversationData,
    	user:state.user
    }
}
	
export default connect(mapStateToProps, actions)(Radium(Profile));
 