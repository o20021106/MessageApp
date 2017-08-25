/*reference https://rhadow.github.io/2015/07/30/beginner-redux/*/

import React from 'react';
import changeCount from './changeCount';
import { connect, Provider } from 'react-redux';



function mapStateToProp(state){
	return{count : state.count}
}

function mapDispatchToProp(dispatch){
	return {addcount : ()=>dispatch(changeCount())};
}
console.log('2');
class App extends React.Component{
	

	render(){
		console.log('3');
		const {count, addcount} = this.props;
		return ( <div>
				<h1>count is : {count}</h1>
				<button onClick = {addcount}>+1</button>
			</div>);


	}

	
	
}




export default connect(mapStateToProp,mapDispatchToProp)(App);