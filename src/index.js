import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
	burger: burgerBuilder,
	order: order
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<React.StrictMode>
			   <App />
			</React.StrictMode>
		</BrowserRouter>
	</Provider>,
  document.getElementById('root')
);

reportWebVitals();
