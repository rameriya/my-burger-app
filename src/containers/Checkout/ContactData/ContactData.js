import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';

const returnInputObject = (elementType, type, placeholder,validation={required:true}) => {
	return {
		elementType:elementType,
		elementConfig:{
			type:type,
			placeholder:placeholder
		},
		value:'',
		validation:validation,
		valid:false,
		touched:false
	}
}

const checkValidity = (value, rules) => {
	let isValid = true;
	if (rules.required){
		isValid = value.trim() !== '' && isValid;
	}
	if (rules.length){
		isValid = (value.length === rules.length) && isValid;
	}
	return isValid;
}

const ContactData = (props) => {
	const [orderForm, setOrderState] = useState({
		name: returnInputObject('input','text','Your Name'),
		mail: returnInputObject('input','email','Your Mail'),
		street: returnInputObject('input','text','Street'),
		zipcode: returnInputObject('input','text','ZIP Code',{required:true, length:6}),
		country: returnInputObject('input','text','Country'),
		deliveryMethod: {
			elementType:'select',
			elementConfig:{
				options:[
					{value:'fastest', displayValue: 'Fastest'},
					{value:'cheapest', displayValue: 'Cheapest'}
				]
			},
			value:'Fastest'
		},		
	});

	const [redirect, setRedirect] = useState(false);
	const [formValid, setValid] = useState(false);

	const onOrderHandler = (event) => {
		event.preventDefault();
		let orderData = {};
		for (let keys in orderForm){
			orderData[keys] = orderForm[keys].value; 
		}

		const order = {
			ingredients:props.ingredients,
			price:props.totalPrice.toFixed(2),
			details:orderData
		}

		if(formValid){
			axios.post('/orders.json',order)
			.then(response => {
				if (response){
					console.log(response,"[BurgerBuilder.js] continueHandler axios.then");
					alert("Your Order has been placed.");	
					setRedirect(true);
				}
				else { throw new Error(response.data);}
			})
			.catch(error => {
				console.log(error.message,"[BurgerBuilder.js] continueHandler axios.catch");
				setRedirect(true);
			});
		}
	};

	const onChangeHandler = (event, id) => {
		let formValid = true;
		let updatedOrderForm = {...orderForm};
		let updatedFormElement = {...updatedOrderForm[id]};
		updatedFormElement.value = event.target.value;
		updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation);
		updatedFormElement.touched = true;
		updatedOrderForm[id] = updatedFormElement;
		setOrderState(updatedOrderForm);
		for (let key in updatedOrderForm){
			if (key === 'deliveryMethod'){
				continue;
			}
			formValid = formValid && updatedOrderForm[key].valid;
		}
		setValid(formValid);
		
	};

	let formElements = [];

	for (let key in orderForm){
		formElements.push({...orderForm[key], id: key});
	}

	formElements = formElements.map((element,index) => {
		return (<Input key={element.id} 
					  elementType={element.elementType} 
					  elementConfig={element.elementConfig} 
					  value={element.value} 
					  changed={(event) => onChangeHandler(event, element.id)}
					  valid={element.valid}
					  touched={element.touched}/>);
	});

	return(

			//  className={classes.ContactData}>
			<div >
				<form onSubmit={onOrderHandler}>
					{formElements}	
					<Button type="Success" >Order</Button>
					{redirect ? <Redirect to="/" />: null}
				</form>
			</div>
		);
}

export default ContactData;