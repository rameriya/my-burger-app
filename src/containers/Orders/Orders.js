import React, {useEffect, useState} from 'react';

import Order from '../../components/Order/Order';
import {connect} from 'react-redux';

import axios from '../../axios-order';
import * as actionCreator from '../../store/actions/index';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
	
	useEffect(() => {
		let queryParams = '?auth='+props.token+'&orderBy="userId"&equalTo="'+props.userId+'"';
		let url = '/orders.json'+queryParams;
		props.retrieveOrder(axios, url);
	}, []);
	
	let order = <Spinner />;
	
	if (!props.loading){
		    order = props.orders.map(order => {
			return (<Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
		});
	}
	console.log(order);
	return order;
}

const mapStateToProps = state => {
	return {
		loading:state.order.loading,
		orders:state.order.fetchedOrders,
		token:state.auth.token,
		userId:state.auth.id
	}
}

const dispatchActionsFromProps = dispatch => {
	return {
		retrieveOrder: (axios, url) => dispatch(actionCreator.fetchOrderStart(axios, url))
	}
}

export default connect(mapStateToProps, dispatchActionsFromProps)(Orders);