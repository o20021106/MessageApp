import fetch from 'isomorphic-fetch';
import React from 'react';



export default class Testing extends React.Component{ 

	render(){

		console.log(this.props);
		return(
				<div>
					in side here i am {this.props.user.name}
				</div>);
	}

}

