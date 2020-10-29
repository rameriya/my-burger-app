import React, {useEffect, useState} from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		
		const [errorState, setErrorState] = useState({
			error:null
		});
		
		useEffect(()=>{
			console.log("[withErrorHandler.js] useEffect.")
			const req = axios.interceptors.request.use(request => {
					setErrorState({
						error:null
					})
					return request;
				})

			const resp = axios.interceptors.response.use(response => response, error => {
					setErrorState({
						error: error
					})
				})

			return () => {
				console.log("[withErrorHandler.js] useEffect cleanup.");
				axios.interceptors.request.eject(req);
				axios.interceptors.response.eject(resp);
			}

		},[errorState.error])
		
		const errorHandler = () =>{
			setErrorState({
				error:null
			})
		}

		return (
				<Aux>
					<Modal show={errorState.error} clicked={errorHandler} >
						{errorState.error ? errorState.error.message:null}
					</Modal>
					<WrappedComponent {...props} />
				</Aux>
			);
	}
};

export default withErrorHandler;