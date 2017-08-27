import React from 'react';
import ReactDom from 'react-dom';
import {createStore,combineReducers} from 'redux';
import {BlogPost} from '/blogPost'; 

const store = createStore()


class Blog extends React.Component{

	render(){
		return
	}

}



import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AddCount from './addCount.js';
import {createStore, combineReducers} from 'redux';
import App from './app.js';

const store = createStore(AddCount);

console.log('1');

class Counter extends React.Component{
	render(){
		return (
			<Provider store = {store}>
				<App />
			</Provider>
			) 
	}
}



ReactDOM.render(<Counter />,document.getElementById('root'));
