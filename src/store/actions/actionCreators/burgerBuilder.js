import * as actionType from '../actionTypes';

export const addIngredient = (ingredient) => {
	return {type:actionType.ADD_INGREDIENT, ingredientName:ingredient};
}

export const removeIngredient = (ingredient) => {
	return {type:actionType.REMOVE_INGREDIENT, ingredientName:ingredient};
}

export const initIngredients = (axios,url) => {
	return dispatch => {
		axios.get(url)
			.then(response => {
				if (response){
					console.log('Watashi wa here!',response.data);
					dispatch(setIngredients(response.data));
				}
			})
			.catch(error => {
				dispatch(setError(error));
			})
	}
}

const setIngredients = (ingredients) => {
	return {type:actionType.SET_INGREDIENTS, ingredients:ingredients};
}

const setError = (error) => {
	return {type:actionType.SET_ERROR, error:error.message};
}