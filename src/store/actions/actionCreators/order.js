import * as actionType from '../actionTypes';

const purchaseBurgerSuccess = (id, orderData) => {
	return {
		type: actionType.PURCHASE_BURGER_SUCCESS,
		orderId: id,
		orderData: orderData
	};
};

const purchaseBurgerFail = (error) => {
	return {
		type: actionType.PURCHASE_BURGER_FAIL,
		error:error
	};
};

export const purchaseBurgerStart = (axios, url, orderData) => {
	return dispatch => {
		axios.post(url, orderData)
			.then(response => {
				console.log('response',response, orderData);
				if (response){
					alert("Your Order has been placed.");
					dispatch(purchaseBurgerSuccess(response.data.name,orderData));	
				}
				else { throw new Error(response.data);}
			})
			.catch(error => {
				dispatch(purchaseBurgerFail(error));
			});
	};
}

export const purchaseBurgerInit = (error) => {
	return {
		type: actionType.PURCHASE_BURGER_INIT
	};
};

const fetchOrderSuccess = (fetchedData) => {
	return{
		type: actionType.FETCH_ORDER_SUCCESS,
		fetchedData: fetchedData
	}
}

const fetchOrderFail = (error) => {
	return{
		type: actionType.FETCH_ORDER_FAIL,
		error: error
	}
}

export const fetchOrderStart = (axios, url) => {
	return dispatch => {
		axios.get(url)
			.then(response => {
				const fetchedData = [];
				for (let key in response.data){
					fetchedData.push({...response.data[key], id: key});
				}
				dispatch(fetchOrderSuccess(fetchedData));
			})
			.catch(error => {
				dispatch(fetchOrderFail(error));
			})
	};
};

export const orderLoadingReset = () => {
	return {
		type:actionType.ORDER_LOADING_RESET
	}
}