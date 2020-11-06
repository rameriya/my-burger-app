import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import * as actionCreator from '../../store/actions/index';

class Layout extends React.Component {

	state = {
		showSideDrawer:false
	}

	closeSideDrawerHandler = () => {
		this.setState({
			showSideDrawer:false
		})
	}

	openSideDrawerHandler = () => {
		this.setState({
			showSideDrawer:true
		})
	}

	render(){
		return (
			<Aux>
				<Toolbar openSideDrawer={this.openSideDrawerHandler} isAuth={this.props.isAuth} />
				<SideDrawer open={this.state.showSideDrawer} close={this.closeSideDrawerHandler} isAuth={this.props.isAuth} />
				<div>SideDrawer, Backdrop</div>
				<main className={classes.Content}>
					{this.props.children}
				</main>
			</Aux>);
		}
}

const mapStateToProps = state => {
	return{
		isAuth:state.auth.isAuth
	}
}


export default connect(mapStateToProps)(Layout);