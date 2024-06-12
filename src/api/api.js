import axios from "./axios";

// Fetch articles by category
export const fetchArticlesByCategory = async (category) => {
	// Capitalize the first letter of the category for consistent API calls
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const capitalizedCategory = capitalizeFirstLetter(category);

	try {
		// API call to fetch articles of a specific category
		const response = await axios.get(
			`/articles?category=${capitalizedCategory}`
		);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
};

// Fetch all articles
export const fetchAllArticles = async () => {
	try {
		// API call to fetch all articles
		const response = await axios.get(`/articles`);
		console.log("API Response:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
};

// Fetch all categories
export const fetchCategories = async () => {
	try {
		// API call to fetch all article categories
		const response = await axios.get("/articles/categories");
		console.log("Fetched categories:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};

// Fetch articles by search query
export const fetchArticlesBySearchQuery = async (query) => {
	try {
		// API call to fetch articles based on search query
		const response = await axios.get(`/articles?search=${query}`);
		console.log("Search API Response:", response.data);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching search results:", error);
		throw error;
	}
};
