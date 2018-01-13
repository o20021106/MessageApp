import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

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
				window.localStorage.setItem('token', json.data.token);
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
		console.log("YOU");

		return(

		<div>
		    <form onSubmit = {(e)=>this.login(e)}>
				email :<input id = 'email' name = "email" type = "text"></input><br/>
				password :<input id = 'password' name = "password" type = "password"></input>
				<input type ="submit" value = "submit"></input>
			</form>
		</div>);
	}

}

ReactDOM.render(<Login />,document.getElementById('root'));
