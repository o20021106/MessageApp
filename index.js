import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, applyMiddleware} from 'redux';
import rootReducer  from './src/reducers/blogPost.js';
import App from './src/app.js';


const createStoreWithMiddleWare = applyMiddleware(thunkMiddleware)(createStore);
const store = createStoreWithMiddleWare(rootReducer);


console.log(store);
console.log(store.getState().blogPosts[0]);
class Blog extends React.Component{
	render(){
		return (
			<Provider store = {store}>
				<App />
			</Provider>
		)
	}
}


ReactDOM.render(<Blog />,document.getElementById('root'));
