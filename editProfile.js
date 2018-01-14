import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import Radium from 'radium';

import EditProfileColumn from './editProfileColumn2';


export default class EditProfile extends React.Component{ 

	render(){
		var EditProfileColumnRadium = Radium(EditProfileColumn);
		console.log("YOU");
		const outerBoxStyle = {	
			display:'flex',
			width :'100%',
			justifyContent: 'center',
			alignItems:'center', 
			height:'100%'}		
		const editProfileColumnBoxStyle = {
			margin:0,
			boxSizing:'border-box',
			width:'100%', 
			height:'100%',
			'@media (min-width : 480px)':{
				maxWidth:480, 
				height:'80%'}
		}

		return(

			<StyleRoot style = {outerBoxStyle}>
				<div style = {editProfileColumnBoxStyle}>
					<EditProfileColumnRadium user= {this.props.user}/>
				</div>
			</StyleRoot>);
	}

}

//ReactDOM.render(<EditProfile />,document.getElementById('root'));
//radiumConfig={{userAgent: req.headers['user-agent']}}