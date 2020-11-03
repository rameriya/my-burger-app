import React,{useState} from 'react';
import {Redirect} from 'react-router-dom';

import axios from '../../../axios-order';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

const ContactData = (props) => {
	const [user, setUserState] = useState({
		name:'',
		mail:'',
		address:{
			street:'',
			postal:''
		},
		redirect:false
	})

	const [loading, setLoading] = useState(false);

	const onOrderHandler = (event) => {
		event.preventDefault();
		//alert("Give me a Hell Yeah!")
		// this.setState({
		setLoading(true);
		//})

		const order = {
			ingredients:props.ingredients,
			price:props.totalPrice.toFixed(2),
			customer:{
				name:'Piyush Shrivastava',
				address:{
				street:'TestStreet',
				zipcode:'452009',
				country:'India'
			    },
			    email:'pshrivastava@isystango.com'
			},
			deliverMethod:'Fastest'
		}
		console.log(order);
		axios.post('/orders.json',order)
			.then(response => {
				if (response){
					console.log(response,"[BurgerBuilder.js] continueHandler axios.then");
					alert("Your Order has been placed.");	
					setLoading(false);
					setUserState({
						...user,
						redirect:true
					});
				}
				else { throw new Error(response.data);}
			})
			.catch(error => {
				console.log(error.message,"[BurgerBuilder.js] continueHandler axios.catch");
				setLoading(false);
				setUserState({
						...user,
						redirect:true
					});
			});
	}

	return(

			<div className={classes.ContactData}>
				<input type="text" placeholder="Your Name" />
				<input type="text" placeholder="Your Mail" />
				<input type="text" placeholder="Street" />
				<input type="text" placeholder="Postal Code" />
				<Button type="Success" clicked={onOrderHandler}>Order</Button>
				{user.redirect ? <Redirect to="/" />: null}
			</div>
		);
}

export default ContactData;