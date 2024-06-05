export const fetchArticlesByCategory = async (category) => {
	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
	};

	const capitalizedCategory = capitalizeFirstLetter(category);

	try {
		const response = await fetch(
			`http://localhost:5000/api/articles?category=${capitalizedCategory}`
		);
		const data = await response.json();
		console.log("API Response:", data);
		return data || [];
	} catch (error) {
		console.error("Error fetching articles:", error);
		throw error;
	}
};

export const fetchCategories = async () => {
	try {
		const response = await fetch(
			`http://localhost:5000/api/articles/categories`
		);
		const data = await response.json();
		console.log("Fetched categories:", data);
		return data || [];
	} catch (error) {
		console.error("Error fetching categories:", error);
		throw error;
	}
};