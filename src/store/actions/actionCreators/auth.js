import * as actionType from '../actionTypes';

const authRequestSuccess = (Token, Id, expiresIn, signIn) => {
	return {
		type: actionType.AUTHENTICATION_SUCCESS,
		token:Token,
		id:Id,
		isAuth:signIn,
		expiresIn:expiresIn
	};
};

const authRequestFail = (error) => {
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
	return dispatch => {
		axios.post(url, authData)
			.then(response => {
				let expiresIn = new Date(new Date().getTime() + response.data.expiresIn * 1000);
				dispatch(authRequestSuccess(response.data.idToken, response.data.localId, expiresIn, sign));
				dispatch(automaticLogout(expiresIn));
			})
			.catch(error => {
				dispatch(authRequestFail(error.message));
			});
	};
};

const automaticLogout = (expiresIn) => {
	return dispatch => {
		setTimeout(() => {
			localStorage.removeItem('token');
			localStorage.removeItem('userId');
			localStorage.removeItem('expiresIn');
			dispatch({type:actionType.LOGOUT});
		},expiresIn - new Date().getTime());
	}
}

export const logout = (token, id, expiresIn) => {
	localStorage.removeItem('token');
	localStorage.removeItem('userId');
	localStorage.removeItem('expiresIn');
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