import ConversationColumn from './conversationColumn';
import ChatWindow from './chatWindow';
import React from 'react';
import { connect, Provider } from 'react-redux';
import * as actions from '../../actions/index';
import Radium from 'radium';

class Nearby extends React.Component{	

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
			/*display : 'none',
			
			'@media (min-width: 480px)':{
				display : 'block',
				maxWidth:200,
				position:'fixed',
				right:0,
				bottom:0
			}
			*/
			backgroundColor: 'orange',
			display:'none',
			'@media (min-width : 480px)':{
				display:'block',
				backgroundColor: 'green',
				height: 300,
				width: 200,
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
					<ConversationColumn/>
				</div>
				<div style = {nearbyStyle}>
				nearby
				</div>
				<div style = {chatWindowStyle}>
					<ChatWindow/>
				</div>
			</div>	
		)
	}

}

function mapStateToProps(state) {  
    return { user:state.user, recipients: state.recipients, conversations: state.conversations, searchedUsers:state.searchedUsers };
}
	
export default connect(mapStateToProps, actions)(Radium(Nearby));









/*



(
				<div style = {messageWindowStyle}>

					<div style = {conversationColumnStyle}>
						<ConversationColumn/>
					</div>

					<div style ={conversationWindowStyle}>
						<div style = {newMessageNoti} ref = {(el)=> {this.conversationNoti=el}}>
							new Message
						</div>
 						<div style = {conversationsStyle} ref = {(el)=>{this.conversationWindowEl=el}}>
							{this.conversationDisplay()}
					 	</div>
					 	<div >
					 		<form onSubmit = {(e) => this.newMessageFromBox(e)}>
					 			<div ref= {(el)=>{this.inputBox = el}} suppressContentEditableWarning='true' contentEditable ='true' style = {{height:50, overflowY:'scroll', border:'1px solid black'}} onKeyPress = {(e)=>this.inputBoxKeyPress(e)}></div>
								<input type = 'submit' value="Submit" ></input>
						 	</form>
						 </div>
					 </div>
					 <div ref = {(el)=>{this.el=el}}></div>
				 </div>
			)	

*/