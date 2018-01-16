import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';

class Login extends React.Component{ 

	login(e){
		console.log(e.currentTarget);
		e.preventDefault();


		var email = e.currentTarget.querySelector('#email').value;
		var password = e.currentTarget.querySelector('#password').value;

		fetch("/login",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    credentials: 'same-origin',
		    method: "POST",
		    body: JSON.stringify({ password: password, email : email})
		})
		.then(function(response) {
			console.log('i am a response '+response);
		    return response.json();
		})
		.then(json=>{
			console.log('i am parse json'+json.data.token);
			console.log('i am parse json'+json.data.user.name);

			if (typeof(Storage) !== "undefined") {
				localStorage.getItem('token');

				localStorage.setItem('token', json.data.token);
				console.log(localStorage.setItem('token', json.data.token));
				console.log(json.url);
				//localStorage.setItem('user', JSON.stringify(json.data.user)); 
				window.location.href = json.url;
				console.log('here');
 			} else { 
			    // Sorry! No Web Storage support..
			}
		})
		.catch(err=>{
			console.log(err);
		});
	}

	
	render(){
		const outerBoxStyle = {	
			display:'flex',
			flexDirection:'column',
			width :'100%',
			justifyContent: 'center',
			alignItems:'center', 
			height:'100%'}
		const loginBoxStyle = {
			margin:0,
			boxSizing:'border-box',
			padding:'30px 30px 30px 30px',
			backgroundColor: 'green',
			flex:1,
			overflowY:'scroll',
			width:'100%',
			'@media (min-width : 480px)':{
				maxWidth:480,
				margin:50,
				overflowY:'visible'}
			}
		const inputItemBoxStyle = {display:'flex', alignItems:'center'}
		const inputBoxStyle = {
			flex:1, minWidth:0,  
			borderBottom: '1px solid white',
			borderTop:0, 
			borderLeft:0, 
			borderRight:0,
			backgroundColor:'green', 
			padding:10, 
			marginLeft:20};
		return(

		<StyleRoot style = {{height:'100%'}}>
			<div style = {outerBoxStyle}>
			    <form onSubmit = {(e)=>this.login(e)} style = {loginBoxStyle}>
			    	<div style = {{marginTop:18}}>
			    		<div style = {inputItemBoxStyle}>
			    			<i className='fa fa-envelope fa-fw'></i>

							<input placeholder = 'EMAIL' id = 'email' name = "email" type = "text" style ={inputBoxStyle}></input>
						</div>
						<div ref =  {(el)=>{this.emailCheck = el}} style = {{visibility:'hidden'}}>
							user not found
						</div>
					</div>
					<div style = {{marginTop:48}}>
			    		<div style = {inputItemBoxStyle}>
			    			<i className='fa fa-lock fa-fw'></i>
							<input placeholder='PASSWORD' id = 'password' name = "password" type = "password" style = {inputBoxStyle}></input>					</div>
						<div ref =  {(el)=>{this.passwordCheck = el}} style = {{visibility:'hidden'}}>
							unmatch
						</div>
						<input type='submit' value = 'LOGIN' style = {{textAlign:'center', marginTop:48, backgroundColor:'white', padding:10, width:'100%',borderStyle:'none'}}></input>
					</div>
				</form>
			</div>
		</StyleRoot>);
	}

}

ReactDOM.render(<Login />,document.getElementById('root'));
