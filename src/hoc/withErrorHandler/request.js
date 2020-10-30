const req = (axios, errorSetterHandler) => axios.interceptors.request
										.use(request => 
												{	
													errorSetterHandler(null);
													return request;
												}
											)

export default req;