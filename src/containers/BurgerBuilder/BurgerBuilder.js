import React from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal';
import OrderSummary from '../../components/OrderSummary/OrderSummary';
import Backdrop from '../../components/UI/Backdrop/Backdrop';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

const INGREDIENT_PRICES = {
	salad:0.5,
	meat:1.3,
	bacon:0.7,
	cheese:0.4
}

class BurgerBuilder extends React.Component{

	state = {
		ingredients:{
			salad:0,
			meat:0,
			bacon:0,
			cheese:0,
		},
		totalPrice:4,
		purchasable:false,
		showModal:false,
		loading:false
	}

	purchaseStateHandler = (ingredients) =>{
		let count = Object.keys(ingredients)
					.map(igKey => ingredients[igKey])
					.reduce((sum, ele) => sum+ele, 0);
		
		this.setState({
			purchasable:count > 0
		})
		console.log(this.state.purchasable);
	}

	addIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type];
		let updatedCount = oldCount + 1;
		let updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENT_PRICES[type];
		let oldPrice = this.state.totalPrice;
		let newPrice = oldPrice + priceAddition;

		this.setState({
			ingredients:{...updatedIngredients},
			totalPrice:newPrice
		});
		this.purchaseStateHandler(updatedIngredients);
	}

	removeIngredientHandler = (type) => {
		let oldCount = this.state.ingredients[type];
		if (oldCount === 0){
			return;
		}
		let updatedCount = oldCount - 1;
		let updatedIngredients = {...this.state.ingredients};
		updatedIngredients[type] = updatedCount;
		const priceSubtraction = INGREDIENT_PRICES[type];
		let oldPrice = this.state.totalPrice;
		let newPrice = oldPrice - priceSubtraction;

		this.setState({
			ingredients:{...updatedIngredients},
			totalPrice:newPrice
		});
		this.purchaseStateHandler(updatedIngredients);
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
		//alert("Give me a Hell Yeah!")
		this.setState({
			loading:true
		})
		const order = {
			ingredients:this.state.ingredients,
			price:this.state.totalPrice,
			customer:{
				name:'Piyush Shrivastava',
				address:{
				street:'TestStreet',
				zipcode:'452009',
				country:'India'
			    },
			    email:'pshrivastava@isystango.com'
			},
			deliverMethod:'Fastest'
		}
		axios.post('/orders.json',order)
		.then(response => {this.setState({
			loading:false
		})})
		.catch(error => {this.setState({
			loading:false
		})});
	}

	render(){
		let orderSummary = <OrderSummary ingredients={this.state.ingredients} 
					total={this.state.totalPrice} 
					hide={this.modalHideHandler}
					continue={this.continueHandler}
					/>;

		if (this.state.loading){
			orderSummary = <Spinner />;
		}			
		
		return (
			<Aux>
				<Backdrop show={this.state.showModal} clicked={this.modalHideHandler}/>
				<Modal show={this.state.showModal} >
					{orderSummary}
				</Modal>
				<Burger ingredients={this.state.ingredients} />
				<BuildControls 
				ingredientAdded={this.addIngredientHandler} 
				ingredientRemoved={this.removeIngredientHandler} 
				currentPrice={this.state.totalPrice} 
				purchasable={this.state.purchasable} 
				clicked={this.modalDisplayHandler}/>
			</Aux>
			);
	}
}

export default BurgerBuilder;