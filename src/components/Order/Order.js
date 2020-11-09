import React from 'react';
import classes from './Order.module.css';

const order = (props) => {

	let ingredients = [];
	for (let ingredientName in props.ingredients){
		ingredients.push({
			name: ingredientName,
			amount:props.ingredients[ingredientName]
		})
	}
	
	ingredients = ingredients.map(ingredient => {
		return <span>{ingredient.name} ({ingredient.amount})</span>
	})
	return (
		<div className={classes.Order}>
			<p>Ingredients:{ingredients}</p>
			<p>Price:<strong> USD {props.price.toFixed(2)}</strong></p>
		</div>
		);
		
	};

export default order;