import * as actionType from './action';

const initialState = {
	ingredients:{
		salad:0,
		bacon:0,
		meat:0,
		cheese:0
	},
	totalPrice:4
}

const INGREDIENT_PRICES = {
	salad:0.5,
	meat:1.3,
	bacon:0.7,
	cheese:0.4
}

const reducer = (state = initialState, action) => {
	switch(action.type){
		case actionType.ADD_INGREDIENT: 
			return{
				...state,
				ingredients:{
					...state.ingredients,
					[action.ingredientName]:state.ingredients[action.ingredientName] + 1
				},
				totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
			}
		case actionType.REMOVE_INGREDIENT: 
			return{
				...state,
				ingredients:{
					...state.ingredients,
					[action.ingredientName]:(state.ingredients[action.ingredientName]) ? state.ingredients[action.ingredientName] - 1 : state.ingredients[action.ingredientName]
				},
				totalPrice: (state.ingredients[action.ingredientName])? state.totalPrice - INGREDIENT_PRICES[action.ingredientName] : state.totalPrice
			}
		default: return state;
	}
	
};

export default reducer;