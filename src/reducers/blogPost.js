const initial = {blogPosts : ['hey']}; 


function blogPost(state = initial, action){
	switch (action.type){
		case 'INIT_BLOGPOST':
			return {blogPosts : action.blogPosts};
			break;
		default:
			return state;
	}
}


export default blogPost