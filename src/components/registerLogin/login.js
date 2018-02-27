import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';
import {buttonStyle, 
	hrStyle,
	textButtonStyle,
	RLouterBoxStyle,
	plainBoxStyle,
	RLinputItemBoxStyle,
	RLinputBoxStyle,
	hideIfBig,
	showIfBigInline} from '../../../utility/style';

export default class Login extends React.Component{ 

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
		console.log('login');

	

		return(

			<div style = {[RLouterBoxStyle, this.props.style]}>
			    <form onSubmit = {(e)=>this.login(e)} style = {plainBoxStyle}>
			    	<div style = {{marginTop:18}}>
			    		<div style = {RLinputItemBoxStyle}>
			    			<i className='fa fa-envelope fa-fw'></i>
							<input placeholder = 'EMAIL' id = 'email' name = "email" type = "text" style ={RLinputBoxStyle}></input>
						</div>
						<div ref =  {(el)=>{this.emailCheck = el}} style = {{visibility:'hidden'}}>
							user not found
						</div>
					</div>
					<div style = {{marginTop:48}}>
			    		<div style = {RLinputItemBoxStyle}>
			    			<i className='fa fa-lock fa-fw'></i>
							<input placeholder='PASSWORD' id = 'password' name = "password" type = "password" style = {RLinputBoxStyle}></input>					</div>
						<div ref =  {(el)=>{this.passwordCheck = el}} style = {{visibility:'hidden'}}>
							unmatch
						</div>
						<input type='submit' value = 'LOG IN' style = {[buttonStyle,{marginTop:48},{font:'400 15px helvetica'}]}></input>
					</div>

					<hr style = {[hrStyle, {marginTop:40}]}></hr>
					<div style={[showIfBigInline,{width:'100%'}]}>
						<div style = {{width:'100%', textAlign:'center'}}>
							new in town? <a key = 'registerBig' style={textButtonStyle} onClick = {()=>this.props.selectRL('register')}>register</a>
						</div>
					</div>
					<div style={[{width:'100%', textAlign:'center',marginTop:40},hideIfBig]}>
						<div key = 'registerSmall' style={[buttonStyle]} onClick = {()=>this.props.selectRL('register')}>
							REGISTER
						</div>
					</div>
				</form>
			</div>
		);
	}

}

//ReactDOM.render(<Login />,document.getElementById('root'));
