import {put, delay} from 'redux-saga/effects';
import * as actionType from '../actions/actionTypes';
import * as actions from '../actions/index';

export function* logout(action) {
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('expiresIn');
	yield put(actions.endSession());
};

export function* checkTimeout(action) {
	yield delay(action.expiresIn);
	yield localStorage.removeItem('token');
	yield localStorage.removeItem('userId');
	yield localStorage.removeItem('expiresIn');
	yield put({
		type:actionType.LOGOUT
	});
};

export function* authRequest(action) {
	try{
		let response = yield action.axios.post(action.url, action.authData);
		let expiresIn = yield new Date(new Date().getTime() + response.data.expiresIn * 1000);
		yield put(actions.authRequestSuccess(response.data.idToken, response.data.localId, expiresIn, action.sign));
		yield put(actions.automaticLogout(expiresIn - new Date().getTime()));
	}
	catch(error){
		yield put(actions.authRequestFail(error.message));
	}
	
}	