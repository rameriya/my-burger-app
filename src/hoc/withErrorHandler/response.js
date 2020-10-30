const resp = (axios, errorSetterHandler) =>  axios.interceptors.response.use(response => response,
		error => {
			errorSetterHandler(error);
		})

export default resp;