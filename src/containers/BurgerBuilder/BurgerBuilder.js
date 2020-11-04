import React from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Aux';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

import axios from '../../axios-order';
import * as actionType from '../../store/action';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';

class BurgerBuilder extends React.Component{

	state = {
		showModal:false,
		loading:false,
		error:false
	}

	componentDidMount(){
		axios.get('https://my-burger-app-12b1d.firebaseio.com/ingredients.json')
			.then(response => {
				//console.log("[BurgerBuilder.js] ComponentDidMount axios.then",response);
				if (response){
					this.setState({
						ingredients:response.data
					})
				}
			})
			.catch(error => {
				//console.log("[BurgerBuilder.js] ComponentDidMount axios.catch",error);
				this.setState({
					error:true
				})
			})
	}

	purchaseStateHandler = (ingredients) =>{
		let count = Object.keys(ingredients)
					.map(igKey => ingredients[igKey])
					.reduce((sum, ele) => sum+ele, 0);
		
		return count > 0;
		// console.log(this.state.purchasable);
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
		console.log(this.props.ingredients);
		for (let i in this.props.ingredients){
			console.log(i)
			queryParams.push(encodeURIComponent(i)+'='+encodeURIComponent(this.props.ingredients[i]));
		}
		queryParams.push('price='+this.props.totalPrice);
		const queryString = queryParams.join('&');
		this.props.history.push({
				pathname:'/checkout',
				search: '?'+queryString
			});
		}

	render(){
		let orderSummary = <Spinner />;
		let burger = this.state.error ? <p>Something went wrong</p>:<Spinner />;

		if (this.state.ingredients){
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
				clicked={this.modalDisplayHandler}/>

			</Aux>
			);
	}
}

const mapStateToProps = (state) => {
	return {
		ingredients:state.ingredients,
		totalPrice:state.totalPrice
	}
}

const dispatchActionFromProps = (dispatch) => {
	return {
		addIngredientHandler: (ingredient) => dispatch({type:actionType.ADD_INGREDIENT, ingredientName:ingredient}),
		removeIngredientHandler: (ingredient) => dispatch({type:actionType.REMOVE_INGREDIENT, ingredientName:ingredient})
	}
}

export default connect(mapStateToProps, dispatchActionFromProps)(withErrorHandler(BurgerBuilder, axios));