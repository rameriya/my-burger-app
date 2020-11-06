import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import Input from '../../../components/UI/Input/Input';
import * as actionCreator from '../../../store/actions/index';
import checkValidity from '../../../components/Utilities/CheckValidity';
import returnInputObject from '../../../components/Utilities/ReturnInputObject';

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
			let url = '/orders.json?auth='+props.token;
			props.onOrderHandler(axios,url,order);

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
					{props.redirect ? <Redirect to="/" />: null}
				</form>
			</div>
		);
}

const mapStateToProps = (state) => {
	return {
		orders:state.order.orders,
		redirect:state.order.redirect,
		token:state.auth.token
	};
};

const dispatchActionsFromProps = dispatch => {
	return {
		onOrderHandler: (axios, url, orderData, token) => dispatch(actionCreator.purchaseBurgerStart(axios,url,orderData,token))
	};
};

export default connect(mapStateToProps, dispatchActionsFromProps)(ContactData);