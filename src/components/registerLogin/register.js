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


export default class Register extends React.Component{ 
	constructor(props){
		super(props);
		this.previewAvatar =this.previewAvatar.bind(this);
		this.chooseFile =this.chooseFile.bind(this);
		this.createAccount =this.createAccount.bind(this);
	}

	previewAvatar() {
	  var preview = this.avatar;
	  var file    = this.imgInput.files[0];
	  var reader  = new FileReader();

	  reader.addEventListener("load", function () {
	    preview.src = reader.result;
	  }, false);

	  if (file) {
	    reader.readAsDataURL(file);
	  }
	}
	chooseFile(e){
		e.preventDefault();

		this.imgInput.click();
	}

	createAccount(e){
		e.preventDefault();
		var registerData = new FormData(this.form);
		console.log({ password: registerData.get('password'), email : registerData.get('email'), name:registerData.get('name')});
		this.emailCheck.style.visibility = 'hidden';
		this.passwordCheck.style.visibility = 'hidden';
		this.userCheck.style.visibility = 'hidden';
		this.nameCheck.style.visibility = 'hidden';

		const checker = {name: this.nameCheck, email: this.emailCheck, password:this.passwordCheck, userCheck:this.userCheck};
		if(registerData.get('password') === '' ||registerData.get('email')===''||registerData.get('name')===''){
			for(var key of registerData.keys()){
				if(registerData.get(key) === ''){
					console.log(key);
					console.log(registerData.get(key));
					checker[key].innerHTML = key+' required';
					checker[key].style.visibility = 'visible';
				}
			}
		}
		else{
			fetch('/register',
			{
			    headers: {
			      'Accept': 'application/json',
			      'Content-Type': 'application/json'
			    },
			    credentials: 'same-origin',
			    method: "POST",
			    body: JSON.stringify({ password: registerData.get('password'), email : registerData.get('email'), name:registerData.get('name')})
			})
			.then(function(response) {
				console.log('i am a response '+response);
			    return response.json();
			})
			.then(json=>{
				if(json.hasOwnProperty('message')){
					json.message.forEach(function(mess){
						if(mess.param === 'email'){
							checker[mess.param].innerHTML = 'invalid email';
							checker[mess.param].style.visibility = 'visible';
						}
						else if(mess.param === 'password'){
							checker[mess.param].innerHTML = 'password must be at leat 6 characters long';
							checker[mess.param].style.visibility = 'visible';
						}
					})
				}
				else if (json.hasOwnProperty('error')){
					if(json['error'] === 'exist'){
						console.log('exist')
						checker['userCheck'].innerHTML = 'user already exists';
						checker['userCheck'].style.visibility = 'visible';
					}
					else if(json.hasOwnProperty('failed')){
						console.log('failed');
						checker['userCheck'].innerHTML = 'creating account failed';
						checker['userCheck'].style.visibility = 'visible';

					}
				}
				else if(json.hasOwnProperty('url')){
					if (typeof(Storage) !== "undefined") {						
						localStorage.getItem('token');
						localStorage.setItem('token', json.data.token);
						window.location.href = json.url;
						console.log('here');
 					} else { 
			    // Sorry! No Web Storage support..
					}
					console.log(json.url);
					window.location.href = json.url;
				}


			})
			.catch(err=>{
				console.log(err);
			});
		}
	}

	render(){
		console.log("YOU");

		return(

				<div style = {[RLouterBoxStyle, this.props.style]}>
					<form ref = {(el)=>{this.form = el}} style = {plainBoxStyle} onSubmit = {(e)=>this.createAccount(e)}>
						<div style = {{marginTop:18}}>
							<div style = {RLinputItemBoxStyle}>
								<i className="fa fa-user fa-fw"></i>
								<input placeholder ='USERNAME' name = "name" type = "text" style = {RLinputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.nameCheck = el}} style = {{visibility: 'hidden'}}>
								invalid name
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {RLinputItemBoxStyle}>
								<i className="fa fa-envelope fa-fw"></i>
								<input placeholder = 'EMAIL' name = "email" type = "text" style = {RLinputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.emailCheck = el}} style = {{visibility: 'hidden'}}>
								email has already been taken
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {RLinputItemBoxStyle}>
								<i className="fa fa-lock fa-fw"></i>
								<input placeholder = 'PASSWORD' name = "password" type = "password" style = {RLinputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.passwordCheck = el}} style = {{visibility: 'hidden'}}>
								password must be at leat 6 characters long
							</div>
						</div>
						<input type='submit' value = 'CREATE ACCOUNT' onClick = {(e)=> this.createAccount(e)} style = {[buttonStyle,{marginTop:48,font:'400 15px helvetica'}]}>
							
						</input>
						<div ref ={(el)=>{this.userCheck = el}} style = {{visibility:'hidden'}}>user already exists</div>
						<hr style = {[hrStyle, {marginTop:40}]}></hr>
						<div style={[showIfBigInline,{width:'100%'}]}>
							<div style = {{width:'100%', textAlign:'center'}}>
								already have an acount? <a key = 'login' style={textButtonStyle} onClick = {()=>this.props.selectRL('login')}>log in</a>
							</div>
						</div>
						<div style={[{width:'100%', textAlign:'center',marginTop:40},hideIfBig]}>
							<div key = 'loginSmall' style={[buttonStyle]} onClick = {()=>this.props.selectRL('login')}>
								LOG IN
							</div>
						</div>
					</form>
				</div>	)

			;
	}

}

//ReactDOM.render(<Register />,document.getElementById('root'));
