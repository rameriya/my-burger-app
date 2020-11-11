import {takeEvery} from 'redux-saga/effects';

import * as actionType from '../actions/actionTypes';
import {logout, checkTimeout, authRequest} from './auth';

export function* watchAuth(action){
	yield takeEvery(actionType.LOGOUT_INIT, logout);
	yield takeEvery(actionType.CHECKTIMEOUT, checkTimeout);
	yield takeEvery(actionType.AUTHENTICATION_REQUEST_INIT, authRequest);
}