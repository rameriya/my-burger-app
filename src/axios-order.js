import axios from 'axios';

const instance = axios.create({
	baseURL:'https://my-burger-app-12b1d.firebaseio.com/'
});

export default instance;