import axios from "axios";

const instance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	withCredentials: true,
});

instance.interceptors.request.use(
	(config) => {
		console.log("Request:", config);
		return config;
	},
	(error) => {
		console.error("Request error:", error);
		return Promise.reject(error);
	}
);

instance.interceptors.response.use(
	(response) => {
		console.log("Response:", response);
		return response;
	},
	(error) => {
		console.error("Response error:", error);
		return Promise.reject(error);
	}
);

export default instance;
