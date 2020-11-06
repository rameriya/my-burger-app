import React from 'react';
import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';
import {connect} from 'react-redux';
import * as actionCreator from '../../../store/actions/index';

const navigationItems = (props) => {
	return (
		<ul className={classes.NavigationItems}>
			<NavigationItem link="/"  clicked={props.resetLoading} >BurgerBuilder</NavigationItem>
			<NavigationItem link="/orders">Orders</NavigationItem>
		</ul>
		);
}

const dispatchActionFromProps = dispatch => {
	return {
		resetLoading: () => dispatch(actionCreator.orderLoadingReset())
	}
}

export default connect(null, dispatchActionFromProps)(navigationItems);