import React from 'react';
import { connect } from 'react-redux';
//import * as actions from '../../actions/index';
import Radium from 'radium';
import { renderRoutes } from 'react-router-config';


class About extends React.Component{ 
	/*static fetchData(store) {
    	return store.dispatch(actions.loadConversations());
  	}
  	  componentDidMount() {
		this.props.loadConversations();
  	}*/

	render(){
		const love = {
			padding:10,
			backgroundColor: 'black',
			'@media (min-width : 480px)':{
				backgroundColor: 'red'}
				
			}
			console.log(this.props);
		return(
			<div style = {love}>
				{renderRoutes(this.props.route.routes)}
			</div>
		);
	}

}

function mapStateToProps(state) {
    return {...state};
}

export default connect(mapStateToProps)(Radium(About));

