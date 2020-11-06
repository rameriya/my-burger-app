import * as actionType from '../actions/actionTypes';
import updateState from './utility';

const initialState = {
	orders:[],
	fetchedOrders:[],
	redirect:false,
	loading:true
};

const successfulPurchase = (state, action) => {
	let newOrders = [...state.orders];
	let order = {};
	order[action.orderId] =  action.orderData;
	newOrders.push(order);
	return updateState(state, {orders:[...newOrders], redirect:true});
}

const reducer = (state = initialState, action) => {
	switch(action.type){

		case actionType.PURCHASE_BURGER_INIT: return updateState(state, {redirect:false});

		case actionType.PURCHASE_BURGER_SUCCESS: return successfulPurchase(state, action);

		case actionType.PURCHASE_BURGER_FAIL: return updateState(state, {error:action.error, redirect:true});

		case actionType.FETCH_ORDER_SUCCESS: return updateState(state, {fetchedOrders:[...action.fetchedData], loading:false});

		case actionType.FETCH_ORDER_FAIL: return updateState(state, {error:action.error, loading:false});

		case actionType.ORDER_LOADING_RESET: return updateState(state, {loading:true});

		default: return state;
	}
};

export default reducer;