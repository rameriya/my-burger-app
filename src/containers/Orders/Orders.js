import React, {useEffect, useState} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
	const [orders, setOrderState] = useState([]);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		axios.get('/orders.json')
			.then(response => {
				setLoading(false);
				const fetchedData = [];
				for (let key in response.data){
					fetchedData.push({...response.data[key], id: key});
				}
				setOrderState([...fetchedData]);
			})
			.catch(error => {
				setLoading(false);
				console.log(error);
			})
	}, []);
	
	let order = <Spinner />;
	
	if (!loading){
		    order = orders.map(order => {
			return (<Order key={order.id} ingredients={order.ingredients} price={+order.price} />)
		});
	}
	console.log(order);
	return order;
}

export default Orders;