import axios from 'axios';

const config = {
	baseURL: 'http://www.omdbapi.com',
};
const key = '';
const axiosInstance = axios.create(config);

const API = {
	searchFilmsByTitle: (title) => {
		const query = `/${key}&s=${title}`
		return axiosInstance.get(query);
	},
};

export default API