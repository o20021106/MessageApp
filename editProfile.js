import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

class Register extends React.Component{ 
	constructor(props){
		super(props);
		this.previewAvatar =this.previewAvatar.bind(this);
		this.chooseFile =this.chooseFile.bind(this);
	}
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
				localStorage.setItem('token', json.data.token);
				localStorage.setItem('user', JSON.stringify(json.data.user)); 
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
	render(){
		console.log("YOU");

		return(

			<div>
			    <form action = "/register" encType= 'multipart/form-data' method = "post">
					email :<input name = "email" type = "text"></input>
					password :<input name = "password" type = "password"></input>
					name :<input name = "name" type = "text"></input>
					profile picture: <input type = 'file' name = 'avatar' style={{display:'none'}} onChange = {this.previewAvatar} ref = {(el)=>{this.imgInput = el}}></input>
					<button onClick={(e)=>this.chooseFile(e)}>profile</button>
					<input type ="submit" value = "submit"></input>
					<img ref = {(el)=>{this.avatar = el}}></img>
				</form>
			</div>);
	}

}

ReactDOM.render(<Register />,document.getElementById('root'));
