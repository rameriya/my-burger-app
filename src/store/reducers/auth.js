import * as actionType from '../actions/actionTypes';
import updateState from '../../components/Utilities/utility';

const initialState = {
	token:null,
	id:null,
	isAuth:false,
	error: false,
	expiresIn:null
};

const authSuccess = (state, action) =>{
	localStorage.setItem('token', action.token);
	localStorage.setItem('userId', action.id);
	localStorage.setItem('expiresIn', action.expiresIn);
	return updateState(state, {token:action.token, id:action.id, isAuth:action.isAuth, expiresIn:action.expiresIn});
};

const authFail = (state, action) =>{
	return updateState(state, {error:action.error});	
};

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionType.AUTHENTICATION_SUCCESS: return authSuccess(state, action);

		case actionType.AUTHENTICATION_FAIL: return authFail(state, action);

		case actionType.AUTHENTICATED: return updateState(state, {isAuth:true});

		case actionType.LOGOUT: return updateState(state, {isAuth:false, token:null, id:null, expiresIn:null});

		default: return state;
	};
};

export default reducer;