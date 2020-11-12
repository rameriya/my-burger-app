import React from 'react';

import Aux from '../../hoc/Aux';
import Button from '../UI/Button/Button'

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
			<p><strong>Your Grand total is: {props.total.toFixed(2)} $</strong></p>
			<p>Continue to Checkout?</p>
			<Button type="Danger" clicked={props.hide}>CANCEL</Button>
			<Button type="Success" clicked={props.continue}>CONTINUE</Button>
		</Aux>
		)
}

export default orderSummary;