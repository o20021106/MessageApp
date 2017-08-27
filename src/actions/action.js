export function fetchPost(){
	return function(dispatch){
		fetch('/api')
			.then(function(response) {
				console.log('i am a response '+response);
			    return response.json();
			})
			.then(json=>{
				console.log('i am parse json'+json[0].title);
				dispatch({
					type : "INIT_BLOGPOST",
					blogPosts : json
				});		
			})
			.catch(err=>{
				console.log(err);
			});
	}
}


