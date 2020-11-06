import * as actionType from '../actionTypes';

const authRequestSuccess = (Token, Id,signIn) => {
	return {
		type: actionType.AUTHENTICATION_SUCCESS,
		token:Token,
		id:Id,
		isAuth:signIn
	};
};

const authRequestFail = (error) => {
	return {
		type: actionType.AUTHENTICATION_FAIL,
		error: error
	};
};

export const authenticationSuccess = (Token, Id, signIn) => {
	return {
		type: actionType.AUTHENTICATED,
		token:Token,
		id:Id,
		isAuth: signIn
	}
}

export const authRequestStart = (axios, url, authData, sign) => {
	return dispatch => {
		axios.post(url, authData)
			.then(response => {
				dispatch(authRequestSuccess(response.data.idToken, response.data.localId, sign));
			})
			.catch(error => {
				dispatch(authRequestFail(error.message));
			});
	};
};

export const logout = () => {
	return{
		type:actionType.LOGOUT
	}
}