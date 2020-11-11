import * as actionType from '../actionTypes';

export const authRequestSuccess = (Token, Id, expiresIn, signIn) => {
	return {
		type: actionType.AUTHENTICATION_SUCCESS,
		token:Token,
		id:Id,
		isAuth:signIn,
		expiresIn:expiresIn
	};
};

export const authRequestFail = (error) => {
	return {
		type: actionType.AUTHENTICATION_FAIL,
		error: error
	};
};

export const authenticationSuccess = (Token, Id, expiresIn, signIn) => {
	return {
		type: actionType.AUTHENTICATED,
		token:Token,
		id:Id,
		isAuth: signIn,
		expiresIn:expiresIn
	}
}

export const authRequestStart = (axios, url, authData, sign) => {
	return {
		type:actionType.AUTHENTICATION_REQUEST_INIT,
		axios:axios,
		url:url,
		authData:authData,
		sign:sign
	} 
};

export const automaticLogout = (expiresIn) => {
	return{
		type:actionType.CHECKTIMEOUT,
		expiresIn:expiresIn
	}
}

export const logout = (token, id, expiresIn) => {
	return {
		type:actionType.LOGOUT_INIT
	}
}

export const endSession = () => {
	return {
		type:actionType.LOGOUT
	}
}

export const getInitialState = () => {
	return dispatch => {
		let token = localStorage.getItem('token');
		let id = localStorage.getItem('userId');
		let expiresIn = localStorage.getItem('expiresIn');
		if (!token){
			return
		}
		dispatch(authRequestSuccess(token, id, expiresIn, true));
	}
}