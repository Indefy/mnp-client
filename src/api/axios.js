import axios from "axios";

// Create an axios instance with base URL and credentials
const instance = axios.create({
	baseURL: process.env.REACT_APP_API_BASE_URL,
	withCredentials: true,
});

// Interceptor for request logging
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

// Interceptor for response logging
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
