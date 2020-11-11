import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';

import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';

import burgerBuilder from './store/reducers/burgerBuilder';
import order from './store/reducers/order';
import authentication from './store/reducers/auth';
import {watchAuth} from './store/saga/index';

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const rootReducer = combineReducers({
	burger: burgerBuilder,
	order: order,
	auth: authentication
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, sagaMiddleware)));

sagaMiddleware.run(watchAuth);

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
