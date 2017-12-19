import fetch from 'isomorphic-fetch';
import React from 'react';
import ReactDOM from 'react-dom';

console.log("love");
class Love extends React.Component{ 

	love(){
		fetch("/login",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    credentials: 'same-origin',
		    method: "POST",
		    body: JSON.stringify({ password: "800203", email : "r04325008@ntu.edu.tw"})
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
				console.log('here');
 			} else { 
			    // Sorry! No Web Storage support..
			}
		})
		.catch(err=>{
			console.log(err);
		});
	}

	love2(){
		fetch("/login",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    credentials: 'same-origin',
		    method: "POST",
		    body: JSON.stringify({ password: "800203", email : "sandy@gmail.com"})
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
		LOVE
	       <button onClick = {this.love}>r04325008</button>
	       <button onClick = {this.love2}>sandy</button>

		</div>);
	}

}

ReactDOM.render(<Love />,document.getElementById('root'));

/*
fetch("secrete",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({ comment: e.newComment.value, userName: e.userName.value})
})
	.then(function(response) {
		console.log('i am a response '+response);
	    return response.json();
	})
	.then(json=>{
		console.log('i am parse json'+json.data[0].userName);
		this.setState({data: json.data});
	})
	.catch(err=>{
		console.log(err);
});

*/