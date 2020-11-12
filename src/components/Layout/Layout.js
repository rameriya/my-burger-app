import React, {useState} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

const Layout = props =>  {

	const [showSideDrawer, setState] = useState(false);

	const closeSideDrawerHandler = () => {
		setState(false);
	}

	const openSideDrawerHandler = () => {
		setState(true);
	}

	return (
			<Aux>
				<Toolbar openSideDrawer={openSideDrawerHandler} isAuth={props.isAuth} />
				<SideDrawer open={showSideDrawer} close={closeSideDrawerHandler} isAuth={props.isAuth} />
				<div>SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{props.children}
				</main>
			</Aux>);
}

const mapStateToProps = state => {
	return{
		isAuth:state.auth.isAuth
	}
}


export default connect(mapStateToProps)(Layout);