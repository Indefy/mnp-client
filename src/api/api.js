import axios from "./axios";

export const fetchArticlesByCategory = async (category) => {
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const capitalizedCategory = capitalizeFirstLetter(category);

	try {
		const response = await axios.get(
			`/articles?category=${capitalizedCategory}`
		);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
};

export const fetchAllArticles = async () => {
	try {
		const response = await axios.get(`/articles`);
		console.log("API Response:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
};

export const fetchCategories = async () => {
	try {
		const response = await axios.get("/articles/categories");
		console.log("Fetched categories:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

export const fetchArticlesBySearchQuery = async (query) => {
	try {
		const response = await axios.get(`/articles?search=${query}`);
		console.log("Search API Response:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching search results:", error);
		throw error;
	}
};
