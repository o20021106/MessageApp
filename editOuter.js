import React from 'react';
import { render } from 'react-dom';
import EditProfile from './editProfile';

render(<EditProfile {...window.__APP_INITIAL_STATE__} />, document.getElementById('root'));