import React from 'react';
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

class BurgerBuilder extends React.Component{

	state = {
		showModal:false,
		loading:false,
	}

	componentDidMount(){
		let url = 'https://my-burger-app-12b1d.firebaseio.com/ingredients.json';
		this.props.setIngredientsHandler(axios,url)
	}

	purchaseStateHandler = (ingredients) =>{
		let count = ingredients ? Object.keys(ingredients)
					.map(igKey => ingredients[igKey])
					.reduce((sum, ele) => sum+ele, 0) : 0;
		
		return count > 0;
		
	}

	modalDisplayHandler = () =>{
		this.setState({
			showModal:true
		})
	}

	modalHideHandler = () => {
		this.setState((prev) => {
			return {
				showModal: !prev.showModal
			}
		});
	}

	continueHandler = () => {
		
		let queryParams = []
		
		for (let i in this.props.ingredients){

			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ingredients[i]));
		}
		queryParams.push('price='+this.props.totalPrice);
		const queryString = queryParams.join('&');
		if(this.props.isAuth){
			this.props.history.push({
				pathname:'/checkout',
				search: '?'+queryString
			});
		}
		else{
			this.props.history.push("/auth");
			//<Redirect to="/auth" />
		}
		}
		
	render(){
		let orderSummary = <Spinner />;
		let burger = this.props.error ? <p>Something went wrong</p>:<Spinner />;

		if (this.props.ingredients){
			orderSummary = <OrderSummary ingredients={this.props.ingredients} 
						total={this.props.totalPrice} 
						hide={this.modalHideHandler}
						continue={this.continueHandler}
						/>;
						
			if (this.state.loading){
				orderSummary = <Spinner />;
			}	

			burger = <Burger ingredients={this.props.ingredients} />;		
		}
		

		return (
			<Aux>
				<Modal show={this.state.showModal} clicked={this.modalHideHandler}>
					{orderSummary}
				</Modal>
				{burger}
				<BuildControls 
				ingredientAdded={this.props.addIngredientHandler} 
				ingredientRemoved={this.props.removeIngredientHandler} 
				currentPrice={this.props.totalPrice} 
				purchasable={this.purchaseStateHandler(this.props.ingredients)}
				isAuth={this.props.isAuth} 
				clicked={this.modalDisplayHandler}/>

			</Aux>
			);
	}
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