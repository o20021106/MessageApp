import React from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../actions/index';
import Radium from 'radium';

class Test extends React.Component{ 
	/*static fetchData(store) {
    	return store.dispatch(actions.loadConversations());
  	}
  	  componentDidMount() {
		this.props.loadConversations();
  	}*/

	render(){
		const love = {

			backgroundColor: 'green',
			'@media (min-width : 480px)':{
				backgroundColor: 'blue'}
				
			}
			console.log(this.props);
		return(
			<div style = {love}>
				hi there
				{this.props.recipients}
				<button onClick ={()=>this.props.dispatch({type:'test'})}>click</button>
			</div>
		);
	}

}

function mapStateToProps(state) {
    return {...state};
}

export default connect(mapStateToProps)(Radium(Test));

