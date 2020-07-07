import axios from 'axios';

const config = {
	baseURL: 'http://www.omdbapi.com',
};
const key = '';
const axiosInstance = axios.create(config);

const API = {
	searchFilmsByTitle: (title, currentPage) => {
		const query = currentPage === 1
			? `/${key}&s=${title}`
			: `/${key}&s=${title}&page=${currentPage}`
		return axiosInstance.get(query);
	},
	getFullPlot: (imdbID) => {
		const query =`/${key}&i=${imdbID}&plot=full`;
		return axiosInstance.get(query);
	},
};

export default API