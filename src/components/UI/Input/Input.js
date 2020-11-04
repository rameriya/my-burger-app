import React from 'react';

import classes from './Input.module.css';

const input = (props) => {
	let inputelement = null;
	let inputClasses  =[classes.InputElement];

	if (!props.valid && props.touched){
		inputClasses.push(classes.Invalid);
	}

	switch(props.elementType){
		case 'input': inputelement = <input {...props.elementConfig} 
											value={props.value} 
											className={inputClasses.join(' ')} 
											onChange={props.changed}/>
						break;
		case 'textArea': inputelement = <textarea {...props.elementConfig} 
													value={props.value} 
													className={classes.InputElement} 
													onChange={props.changed}/>
						break;
		case 'select': inputelement = (<select className={classes.InputElement}
												value={props.value} 
												onChange={props.changed}>
												{props.elementConfig.options.map(option => (
													<option key={option.value} value={option.value}>{option.displayValue}</option>
													))}
									  </select>);
						break;
		default: inputelement = <input {...props.elementConfig} value={props.value} className={inputClasses.join(' ')}/>
	}
	return (
		<div className={classes.Input}>
			<label className={classes.Label}>{props.children}</label>
			{inputelement}
		</div>
		);
};

export default input;