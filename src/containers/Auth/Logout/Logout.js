import React, {useEffect} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/index';

const Logout = (props) => {
	useEffect(() =>{
		props.resetState();
	},[]);
	return (<Redirect to="/" />);
};

const dispatchActionsFromProps = dispatch => {
	return {
		resetState: () => dispatch(actionCreator.logout())
	};
};

export default connect(null, dispatchActionsFromProps)(Logout);