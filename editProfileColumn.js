import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';


export default class EditProfileColumn extends React.Component{ 
	constructor(props){
		super(props);
		this.previewAvatar =this.previewAvatar.bind(this);
		this.chooseFile =this.chooseFile.bind(this);
		this.EditProfile =this.EditProfile.bind(this);
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

	EditProfile(e){
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
				if('message' in json){
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
				else if ('error' in json){
					if(json['error'] === 'exist'){
						console.log('exist')
						checker['userCheck'].innerHTML = 'user already exists';
						checker['userCheck'].style.visibility = 'visible';
					}
					else if(json['error']==='failed'){
						console.log('failed');
						checker['userCheck'].innerHTML = 'creating account failed';
						checker['userCheck'].style.visibility = 'visible';

					}
				}
				else if('url' in json){
					window.location.href = json.url;
				}


			})
			.catch(err=>{
				console.log(err);
			});
		}
	}
	roleOptions(){
		var roles = ['top','bottom','vers'];
		return roles.map(role=>{
			if (JSON.parse(localStorage.getItem("user")).role === role){
				return <option key={role} value ={role} select = 'selected'>{role}</option>
			}
			else{
				return <option key={role} value ={role}>{role}</option>

			}
		})
	}
	render(){
		console.log("YOU");

		

		const outerBoxStyle = {
			margin:0,
			padding:'30px 30px 30px 30px',
			backgroundColor: 'green',
			width:'100%', 
			height:'100%',
			boxSizing: 'border-box',
			overflowY: 'scroll'
		}
		const inputItemBoxStyle = {display:'flex', alignItems:'center', width:'100%'}
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
				<div style = {outerBoxStyle} >
					<form encType='multipart/form-data' ref = {(el)=>{this.form = el}} style ={{width :'100%'}} method ='post' action='editProfile'>
						<div>
							<input type = 'file' accept='image/*' name = 'avatar' style = {{display:'none'}} ref = {(el)=>{this.imgInput =el}}></input>
							<img ref = {(el)=>{this.avatar = el}} onClick= {this.chooseFile} src = {JSON.parse(localStorage.getItem("user")).avatarURL} style ={{width:100}}></img>
							<button onClick = {this.chooseFile}><i className = 'fa fa-camera'></i></button>
						</div>
						<div style = {{marginTop:18}}>
							<div style = {inputItemBoxStyle}>
								<span>NAME</span>
								<input defaultValue = {JSON.parse(localStorage.getItem("user")).name} name = "name" type = "text" style = {inputBoxStyle}></input>
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<span>ABOUT ME</span>
								<input defaultValue = {JSON.parse(localStorage.getItem("user")).aboutMe} name = "aboutme" type = "text" style = {inputBoxStyle}></input>
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<span>BIRTHDAY</span>
								<input defaultValue = {JSON.parse(localStorage.getItem("user")).birthDay} name = "birthday" type = "date" style = {inputBoxStyle}></input>
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<span>HEIGHT</span>
								<input defaultValue = {JSON.parse(localStorage.getItem("user")).height} name = "height" type = "text" style = {inputBoxStyle}></input>
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<span>WEIGHT</span>
								<input defaultValue = {JSON.parse(localStorage.getItem("user")).weight} name = "weight" type = "text" style = {inputBoxStyle}></input>
							</div>
						</div>
						<div style = {{marginTop:48}}>
							<div style = {inputItemBoxStyle}>
								<span>ROLE</span>
								<select name = "role" style = {inputBoxStyle}>
									{this.roleOptions()}
								</select>
							</div>
						</div>

						<input type='submit' value = 'SAVE' onClick = {(e)=> this.createAccount(e)}style = {{textAlign:'center', marginTop:48, backgroundColor:'white', padding:10, width:'100%',borderStyle:'none'}}>
							
						</input>
						<div ref ={(el)=>{this.userCheck = el}} style = {{visibility:'hidden'}}>user already exists</div>

					</form>
					<div><br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi<br></br>hi</div>
				</div>
			)
	}

}

