import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';
import {StyleRoot} from 'radium';


class Register extends React.Component{ 
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
						window.localStorage.setItem('token', json.data.token);
						//localStorage.setItem('user', JSON.stringify(json.data.user)); 
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

		
		const outerBoxStyle = {	
			display:'flex',
			width :'100%',
			justifyContent: 'center',
			alignItems:'center', 
			height:'100%'}
		const registerBoxStyle = {
			margin:0,
			boxSizing:'border-box',
			padding:'30px 30px 30px 30px',
			backgroundColor: 'green',
			width:'100%', 
			height:'100%',
			'@media (min-width : 480px)':{
				maxWidth:480, 
				height:'80%'}
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
					<form ref = {(el)=>{this.form = el}} style = {registerBoxStyle} onSubmit = {(e)=>this.createAccount(e)}>
						<div style = {{marginTop:18}}>
							<div style = {inputItemBoxStyle}>
								<i className="fa fa-user fa-fw"></i>
								<input placeholder ='USERNAME' name = "name" type = "text" style = {inputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.nameCheck = el}} style = {{visibility: 'hidden'}}>
								invalid name
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<i className="fa fa-envelope fa-fw"></i>
								<input placeholder = 'EMAIL' name = "email" type = "text" style = {inputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.emailCheck = el}} style = {{visibility: 'hidden'}}>
								email has already been taken
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<i className="fa fa-lock fa-fw"></i>
								<input placeholder = 'PASSWORD' name = "password" type = "password" style = {inputBoxStyle}></input>
							</div>
							<div ref = {(el)=>{this.passwordCheck = el}} style = {{visibility: 'hidden'}}>
								password must be at leat 6 characters long
							</div>
						</div>
						<input type='submit' value = 'CREATE ACCOUNT' onClick = {(e)=> this.createAccount(e)}style = {{textAlign:'center', marginTop:48, backgroundColor:'white', padding:10, width:'100%',borderStyle:'none'}}>
							
						</input>
						<div ref ={(el)=>{this.userCheck = el}} style = {{visibility:'hidden'}}>user already exists</div>

					</form>
				</div>	
			</StyleRoot>);
	}

}

ReactDOM.render(<Register />,document.getElementById('root'));
