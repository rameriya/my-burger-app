import React, {useEffect, useState} from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import * as actionCreator from '../../store/actions/index';

const Checkout  = (props) => {
	const [ingredients, setIngredients] = useState({
		salad:0,
		bacon:0,
		meat:0,
		cheese:0
	});

	const [totalPrice, setTotalPrice] = useState(0);
	
	useEffect(() => {
		setTotalPrice(props.price);
		setIngredients({...props.ingredients});
	},[]);

	const onContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
		props.onContinueHandler();
	}

	const onCancelHandler = () => {
		props.history.goBack();
	}
	
	return (<CheckoutSummary continue={onContinueHandler} cancel={onCancelHandler} ingredients={ingredients} totalPrice={totalPrice}/>);
}

const mapStateToProps = (state) => {
	return {
		redirect:state.order.redirect,
		ingredients:state.burger.ingredients,
		price:state.burger.totalPrice
	};
};

const dispatchActionsFromProps = dispatch => {
	return {
		onContinueHandler: () => dispatch(actionCreator.purchaseBurgerInit())
	};
};

export default withRouter(connect(mapStateToProps, dispatchActionsFromProps)(Checkout));