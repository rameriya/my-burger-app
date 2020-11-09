import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/index';

const Logout = (props) => {
	useEffect(() =>{
		props.resetState(props.token, props.id, props.expiresIn);
	},[]);
	return (<Redirect to="/" />);
};

const mapStateToProps = state => {
	return {
		token: state.auth.token,
		id: state.auth.id,
		expiresIn: state.auth.expiresIn
	}
}

const dispatchActionsFromProps = dispatch => {
	return {
		resetState: () => dispatch(actionCreator.logout())
	};
};

export default connect(null, dispatchActionsFromProps)(Logout);