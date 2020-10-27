import React from 'react';
import Aux from '../../hoc/Aux';

const orderSummary = (props) => {
	const ingredients = Object.keys(props.ingredients)
						.map(igKey => (<li key={igKey}><span style={{textTransform:'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>))
						;
	return(
		<Aux>
			<h3>Your Order Summary</h3>
			<p>The follwing were the ingredients added to the Burger:</p>
			<ul>
				{ingredients}
			</ul>
			<p>Your Grand total is: {props.total.toFixed(2)} $</p>
			<p>Continue to Checkout?</p>
		</Aux>
		)
}

export default orderSummary;