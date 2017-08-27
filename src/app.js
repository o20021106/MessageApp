/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider } from 'react-redux';
import {fetchPost} from './actions/action.js';


function mapStateToProp(state){
	return{blogPosts : state.blogPosts}
}



export class App extends React.Component{	

	componentDidMount(){
		this.props.dispatch(fetchPost());
	}

	render(){

		const {blogPosts,dispatch} = this.props;
	
		var blogItems = blogPosts.map(function(blogPost,index){
			return <div key = {index}>{blogPost.title} {blogPost.post}</div>
		});

		console.log('before state');
		return <div>{blogItems}</div>
	}

	
}




export default connect(mapStateToProp)(App);