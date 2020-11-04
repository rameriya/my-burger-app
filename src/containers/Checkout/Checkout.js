import React, {useEffect, useState} from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

const Checkout  = (props) => {
	const [ingredients, setIngredients] = useState({
		salad:0,
		bacon:0,
		meat:0,
		cheese:0
	});

	const [totalPrice, setTotalPrice] = useState(0);
	
	useEffect(() => {
		const searchParams = new URLSearchParams(props.location.search);
		let temp = {}, price = 0;
		for (let entry of searchParams.entries()){
			if (entry[0] === 'price'){
				price = +entry[1];
			}
			else{
				temp[entry[0]]= +entry[1];
			}
		}
		setTotalPrice(price);
		setIngredients({...temp});
	},[]);

	const onContinueHandler = () => {
		props.history.replace('/checkout/contact-data');
		console.log(props);
	}

	const onCancelHandler = () => {
		props.history.goBack();
	}

	return (<CheckoutSummary continue={onContinueHandler} cancel={onCancelHandler} ingredients={ingredients} totalPrice={totalPrice}/>);
}

export default Checkout;