import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
	{label:'Salad', type:'salad'},
	{label:'Bacon', type:'bacon'},
	{label:'Meat', type:'meat'},
	{label:'Cheese', type:'cheese'}
]

const buildControls = (props) => {
	
	return (
		<div className={classes.BuildControls}>
			<p><strong>Current Price:{props.currentPrice.toFixed(2)}</strong></p>
			{controls.map((ctrl, index) => {
				return <BuildControl 
				key={ctrl.label+index} 
				label={ctrl.label} 
				added={() => props.ingredientAdded(ctrl.type)} 
				removed={() => props.ingredientRemoved(ctrl.type)}/>
			})}
		</div>
		);
};

export default buildControls;