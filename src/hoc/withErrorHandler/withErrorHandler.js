import React, {useEffect, useState} from 'react';

import Aux from '../Aux';
import Modal from '../../components/UI/Modal/Modal';

const withErrorHandler = (WrappedComponent, axios) => {
		return (props) => {
		
		const [error, setError] = useState(null);
		
		const req = axios.interceptors.request.use(req => {
												      setError(null);
												      return req;
												    });

		const resp = axios.interceptors.response.use(
												      res => res,
												      err => {
												        setError(err);
												      }
												    );

		console.log(error);
		useEffect(()=>{
			return () => {
		        axios.interceptors.request.eject(req);
		        axios.interceptors.response.eject(resp);
		      };

		},[req, resp]);
		
		const errorConfirmedHandler = () =>{
			setError(null);
		}

		return (
			      <Aux>
			        <Modal show={error} clicked={errorConfirmedHandler}>
			          {error ? error.message : null}
			        </Modal>
			        <WrappedComponent {...props} />
			      </Aux>
			    );

	}
};

export default withErrorHandler;