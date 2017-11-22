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
		    method: "POST",
		    body: JSON.stringify({ password: "800203", email : "r04325008@ntu.edu.tw"})
		})
		.then(function(response) {
			console.log('i am a response '+response);
		    return response.json();
		})
		.then(json=>{
			console.log('i am parse json'+json.token);
			if (typeof(Storage) !== "undefined") {
				localStorage.setItem("token", json.token);
				console.log('here');
				console.log(localStorage.getItem("token")) 
 			} else {
			    // Sorry! No Web Storage support..
			}
		})
		.catch(err=>{
			console.log(err);
		});
	}

	try(){
		fetch("/secrete",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'Authorization' : localStorage.getItem("token")
		    },
		    method: "GET",
		})
		.then(function(response) {
			console.log('i am a response '+response);
		    return response.json();
		})
		.then(json=>{
			console.log('i am parse json'+json);
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
	       <button onClick = {this.love}>love</button>
	       <button onClick = {this.try}>love</button>

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