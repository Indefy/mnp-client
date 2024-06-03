import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
	Container,
	Typography,
	Card,
	CardContent,
	Chip,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchArticlesByCategory } from "../api/api";

const CategoryPage = () => {
	const { category } = useParams();
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true);
				const fetchedArticles = await fetchArticlesByCategory(category);
				console.log("Fetched Articles:", fetchedArticles);
				setArticles(fetchedArticles);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchArticles();
	}, [category]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error: {error}</div>;
	}

	return (
		<Container sx={{ marginTop: 4 }}>
			<Typography variant="h4">Articles in {category}</Typography>
			{articles.length > 0 ? (
				articles.map((article) => (
					<Card key={article._id} sx={{ marginTop: 2, padding: 2 }}>
						<CardContent>
							<Typography variant="h5">{article.title}</Typography>
							<Typography>{article.content}</Typography>
							<Chip label={article.category} sx={{ marginTop: 1 }} />
							<Typography variant="caption">
								By {article.author.username} on{" "}
								{new Date(article.date).toLocaleDateString()}
							</Typography>
							<Button
								component={Link}
								to={`/articles/${article._id}`}
								sx={{ marginTop: 2 }}
								variant="contained"
								color="primary"
							>
								Read More
							</Button>
						</CardContent>
					</Card>
				))
			) : (
				<Typography>No articles found in this category.</Typography>
			)}
		</Container>
	);
};

export default CategoryPage;
