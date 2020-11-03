import React from 'react';
import {Route} from 'react-router-dom';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
import ContactData from '../../../containers/Checkout/ContactData/ContactData';

const checkoutSummary = (props) => {

	console.log("[CheckoutSummary.js]",props.ingredients)
	const check = props.ingredients;
	return (
		<div className={classes.CheckoutSummary} >
			<h1>We hope it tastes well!</h1>
			<div style={{width:'100%', height:'300px', margin:'auto'}}>
				<Burger ingredients={check} />
			</div>
			<Button type="Danger" clicked={props.cancel} >Cancel</Button>
			<Button type="Success" clicked={props.continue} >Continue</Button>
			<Route path="/checkout/contact-data" render={() => <ContactData 
				ingredients={props.ingredients} 
				totalPrice={props.totalPrice}/>} />
		</div>		
		);
}

export default checkoutSummary;