import React, { useEffect, useState } from "react";
import {
	Container,
	Typography,
	Card,
	CardContent,
	Chip,
	Button,
	CircularProgress,
	Alert,
} from "@mui/material";
import { Link } from "react-router-dom";
import { fetchAllArticles } from "../api/api";

const Articles = () => {
	const [articles, setArticles] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	// Fetch all articles
	useEffect(() => {
		const fetchArticles = async () => {
			try {
				setLoading(true);
				const fetchedArticles = await fetchAllArticles();
				console.log("Fetched Articles:", fetchedArticles);
				setArticles(fetchedArticles);
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};
		fetchArticles();
	}, []);

	if (loading) {
		return (
			<Container
				sx={{
					marginTop: 4,
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<CircularProgress />
			</Container>
		);
	}

	if (error) {
		return (
			<Container sx={{ marginTop: 4 }}>
				<Alert severity="error">Error: {error}</Alert>
			</Container>
		);
	}

	return (
		<Container sx={{ marginTop: 4 }}>
			<Typography variant="h4" gutterBottom>
				All Articles
			</Typography>
			<div className="articles-container">
				{articles.length > 0 ? (
					articles.map((article) => {
						console.log("Article:", article); // Log full article object
						console.log("Article Image URL:", article.image);
						return (
							<Card key={article._id} className="article-card">
								<img
									src={article.image || "default-image.jpg"}
									alt={article.title}
									className="article-image"
								/>
								<CardContent className="article-content">
									<Typography variant="h5" gutterBottom>
										{article.title}
									</Typography>
									<Typography paragraph>{article.content}</Typography>
									<div className="article-footer">
										<Chip
											label={article.category}
											className="article-category"
										/>
										<Typography variant="caption" display="block" gutterBottom>
											By{" "}
											{article.author
												? article.author.username
												: "Deleted user"}{" "}
											on {new Date(article.date).toLocaleDateString()}
										</Typography>
									</div>
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
						);
					})
				) : (
					<Typography>No articles found.</Typography>
				)}
			</div>
		</Container>
	);
};

export default Articles;
