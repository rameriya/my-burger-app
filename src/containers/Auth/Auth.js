import React, {useState} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import returnInputObject from '../../components/Utilities/ReturnInputObject';
import checkValidity from '../../components/Utilities/CheckValidity';
import * as actionCreator from '../../store/actions/index';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

import classes from './Auth.module.css';

const Auth = (props) => {
	
	const [controls, setControls] = useState({
		email: returnInputObject('input','email','Mail Address',{required:true, isEmail:true}),
		password: returnInputObject('input','password','Password',{required:true, minLength: 6})
	});

	const [formValid, setValid] = useState(false);
	const [btnState, toggleState] = useState(false);
	
	const button = {
		false:'signUp',
		true:'signIn'
	};

	const onChangeHandler = (event, id) => {
		let formValid = true;
		let updatedControlsForm = {...controls};
		let updatedControlElement = {...updatedControlsForm[id]};
		
		updatedControlElement.value = event.target.value;
		updatedControlElement.valid = checkValidity(updatedControlElement.value, updatedControlElement.validation);
		updatedControlElement.touched = true;
		updatedControlsForm[id] = updatedControlElement;
		
		setControls(updatedControlsForm);
		
		for (let key in updatedControlsForm){
			formValid = formValid && updatedControlsForm[key].valid;
		}
		
		setValid(formValid);		
	};

	const toggler = () => {
		let prevBtnState = btnState;
		prevBtnState = !prevBtnState;
		toggleState(prevBtnState);
	}

	const onOrderHandler = (event) => {
		event.preventDefault();
		
		let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAKqVXILBVa_SsTK7WWd0vahep_HacHU-g';
		
		if (btnState){
			url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKqVXILBVa_SsTK7WWd0vahep_HacHU-g';
		}

		const authData = {
			email: controls.email.value,
			password: controls.password.value,
			returnSecureToken: true
		}
		
		props.authUser(axios, url, authData, btnState);
		
	}


	let formElements = [];

	for (let key in controls){
		formElements.push({...controls[key], id: key});
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
			<div className = {classes.Auth}>
				<form onSubmit={(event) => onOrderHandler(event)}>
					{formElements}	
					<Button type="Success" >{button[btnState]}</Button>
					{/*props.redirect ? <Redirect to="/" />: null*/}
				</form>
				<Button type="Danger" clicked={toggler}>Toggle</Button>
			</div>
		);
};

const dispatchActionsFromProps = dispatch => {
	return {
		authUser: (axios, url, authData, signIn) => dispatch(actionCreator.authRequestStart(axios, url, authData, signIn))
	};
};

export default connect(null, dispatchActionsFromProps)(Auth);