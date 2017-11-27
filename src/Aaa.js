/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import { connect, Provider} from 'react-redux';
class Aaa extends React.Component{	
	render(){

		return (
			<div>
				aaaaaaaaaaaaaaaaaaaaaaaaa
			</div>)
	} 	
}

function mapStateToProps(state) {  
	console.log('why is this happening');
    return state;
}

exports.Aaa = connect(mapStateToProps)(Aaa);
