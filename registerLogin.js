import React from 'react';
import {  BrowserRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';
import { Redirect } from 'react-router';
import Radium from 'radium';
import {StyleRoot} from 'radium';

import ReactDOM from 'react-dom';
import Login from './login';
import Register from './register';




class RegisterLogin extends React.Component{	
	constructor(props){
		super(props);
		this.state = {RL : 'login'};
		this.selectRL = this.selectRL.bind(this);
	}

	selectRL(RL){
		this.setState({RL:RL});
	}

	render(){
		var LoginR = Radium(Login);
		var RegisterR = Radium(Register);
		var loginStyle = {
			display: this.state.RL === 'login'?'flex':'none'
		}
		var registerStyle = {
			display : this.state.RL === 'register'?'flex':'none'
		}
		console.log(this.state.RL);
		console.log(loginStyle);

		console.log(registerStyle);
		return (
				<StyleRoot style = {{height :'100%', width : '100%'}}>
					<LoginR style = {loginStyle} selectRL = {this.selectRL} />
					<RegisterR style = {registerStyle} selectRL = {this.selectRL} />
				</StyleRoot>	
			)
	}
}

/*
class RegisterLogin extends React.Component{	
	render(){
		var login = Radium(Login);
		return (
				<StyleRoot>
					<Router>
						<div>
							<NavLink to = {'/login'}>login</NavLink>

							<Route path= '/login' component = {login}/>
						</div>
					</Router>
				</StyleRoot>	
			)
	}
}
*/
ReactDOM.render(<RegisterLogin />,document.getElementById('root'));
