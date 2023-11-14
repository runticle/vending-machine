import axios from 'axios';

const Client = axios.create({
	baseURL: 'http://localhost:3001',
});

Client.interceptors.response.use(
	response => response,
	error => {
		const status = error.response ? error.response.status : null;

		if (status === 401) {
			if (error.response.data.message === 'Session expired') {
				window.alert('Please log in again');
			}

			localStorage.setItem('authtoken', JSON.stringify(null));
			localStorage.setItem('user', JSON.stringify({}));
			localStorage.setItem('products', JSON.stringify([]));

			window.location.reload();
		}

		return Promise.reject(error);
	},
);

export default Client;
