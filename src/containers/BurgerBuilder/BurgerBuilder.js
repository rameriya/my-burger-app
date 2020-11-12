import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';
import * as actionCreators from '../../store/actions/index';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

const BurgerBuilder = props => {

	const [showModal, setShowModal] = useState(false);
	const [loading, setLoading] = useState(false); 

	useEffect(() => {
		let url = 'https://my-burger-app-12b1d.firebaseio.com/ingredients.json';
		props.setIngredientsHandler(axios,url)
	},[]);

	const purchaseStateHandler = (ingredients) =>{
		let count = ingredients ? Object.keys(ingredients)
					.map(igKey => ingredients[igKey])
					.reduce((sum, ele) => sum+ele, 0) : 0;
		
		return count > 0;
		
	}

	const modalDisplayHandler = () => {
		setShowModal(true);
	}

	const modalHideHandler = () => {
		setShowModal((prev) => !prev);
	}

	const continueHandler = () => {
		
		let queryParams = []
		
		for (let i in props.ingredients){

			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(props.ingredients[i]));
	
		}
	
		queryParams.push('price='+props.totalPrice);
	
		const queryString = queryParams.join('&');
	
		if(props.isAuth){
			props.history.push({
				pathname:'/checkout',
				search: '?'+queryString
			});
		}
		else{
			props.history.push("/auth");
		}
	
	}
		
	let orderSummary = <Spinner />;
	let burger = props.error ? <p>Something went wrong</p>:<Spinner />;

	if (props.ingredients){
		orderSummary = <OrderSummary ingredients={props.ingredients} 
					total={props.totalPrice} 
					hide={modalHideHandler}
					continue={continueHandler}
					/>;
						
	if (loading){
		orderSummary = <Spinner />;
	}	
	burger = <Burger ingredients={props.ingredients} />;
	}
	
	return (
			<Aux>
				<Modal show={showModal} clicked={modalHideHandler}>
					{orderSummary}
				</Modal>
				{burger}
				<BuildControls 
				ingredientAdded={props.addIngredientHandler} 
				ingredientRemoved={props.removeIngredientHandler} 
				currentPrice={props.totalPrice} 
				purchasable={purchaseStateHandler(props.ingredients)}
				isAuth={props.isAuth} 
				clicked={modalDisplayHandler}/>

			</Aux>
			);		

}

const mapStateToProps = (state) => {
	return {
		ingredients:state.burger.ingredients,
		totalPrice:state.burger.totalPrice,
		error:state.burger.error,
		isAuth:state.auth.isAuth
	}
}

const dispatchActionFromProps = (dispatch) => {
	return {
		addIngredientHandler: (ingredient) => dispatch(actionCreators.addIngredient(ingredient)),
		removeIngredientHandler: (ingredient) => dispatch(actionCreators.removeIngredient(ingredient)),
		setIngredientsHandler: (axios,url) => dispatch(actionCreators.initIngredients(axios,url))
	}
}

export default connect(mapStateToProps, dispatchActionFromProps)(withErrorHandler(BurgerBuilder, axios));