import React, {useEffect, useState} from 'react';
import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';
import request from './request';
import response from './response';

const withErrorHandler = (WrappedComponent, axios) => {
	return (props) => {
		
		const [errorState, setErrorState] = useState({
			error:null
		});
		
		const errorSetterHandler = (error) => {
			setErrorState({
			 			error:error
			 		})
		}

		useEffect(()=>{
			console.log("[withErrorHandler.js] useEffect.")
			let req = request(axios, errorSetterHandler);
			let resp = response(axios, errorSetterHandler);

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