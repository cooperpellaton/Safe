import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './components/root-component.jsx';
import './styles/search.css';
import {createInitialStore} from './store/create-store.js';

let store = createInitialStore();

render(
	<Provider store={store}>
		<App/>
  </Provider>
	, document.getElementById('root'));

// Universal Router
// KriaSoft - Boilerplate