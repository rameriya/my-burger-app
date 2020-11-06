import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const sideDrawer = (props) => {

	const attatchedClasses = [classes.SideDrawer, classes.Close];
	if (props.open){
		attatchedClasses[1] = classes.open;
	}

	return(
	<Aux>
		<Backdrop show={props.open} clicked={props.close} />
		<div className={attatchedClasses.join(' ')}>
			<div className={classes.Logo}>
				<Logo />
			</div>
			<nav>
				<NavigationItems isAuth={props.isAuth} />
			</nav>
		</div>
	</Aux>
	);
}

export default sideDrawer;