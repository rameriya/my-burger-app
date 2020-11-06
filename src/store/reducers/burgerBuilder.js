import * as actionType from '../actions/actionTypes';
import updateState from '../../components/Utilities/utility';

const initialState = {
	ingredients:null,
	totalPrice:4,
	error:false
}

const INGREDIENT_PRICES = {
	salad:0.50,
	meat:1.30,
	bacon:0.70,
	cheese:0.40
}

const addIngredient = (state, action) => {
	let updatedIngredients = updateState(state.ingredients, {[action.ingredientName]:state.ingredients[action.ingredientName] + 1});
	let updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName];
	return updateState(state, {ingredients:updatedIngredients, totalPrice: updatedPrice});
}

const removeIngredient = (state, action) => {
	let updatedIngredients = updateState(state.ingredients, {[action.ingredientName]:(state.ingredients[action.ingredientName]) ? state.ingredients[action.ingredientName] - 1 : state.ingredients[action.ingredientName]});
	let updatedPrice = (state.ingredients[action.ingredientName]) ? state.totalPrice - INGREDIENT_PRICES[action.ingredientName] : state.totalPrice;
	return updateState(state, {ingredients:updatedIngredients, totalPrice: updatedPrice});

}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionType.ADD_INGREDIENT: return addIngredient(state, action);

		case actionType.REMOVE_INGREDIENT: return removeIngredient(state, action);

		case actionType.SET_INGREDIENTS: return updateState(state, {ingredients:{...action.ingredients}, totalPrice:4, error:false});

		case actionType.SET_ERROR: return updateState(state, {error:action.error});

		default: return state;
	}
	
};

export default reducer;