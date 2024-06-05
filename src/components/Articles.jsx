import React, { useEffect, useState } from "react";
import axios from "../api/axios";
import {
	Container,
	Typography,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import "../scss/components/_articles.scss";

function Articles() {
	const [articles, setArticles] = useState([]);

	useEffect(() => {
		const fetchArticles = async () => {
			try {
				const { data } = await axios.get("/articles");
				console.log("Fetched articles:", data);
				setArticles(data);
			} catch (error) {
				console.error("Error fetching articles:", error);
			}
		};

		fetchArticles();
	}, []);

	return (
		<Container sx={{ marginTop: 4 }}>
			<Typography variant="h4">Your News</Typography>
			<div className="articles-grid">
				{articles.length > 0 ? (
					articles.map((article) => (
						<Card key={article._id} className="article-card">
							<CardMedia
								component="img"
								height="140"
								image={article.image || "/default-image.jpg"}
								alt={article.title}
							/>
							<CardContent className="article-content">
								<Typography variant="h5" className="article-title">
									{article.title}
								</Typography>
								<Typography className="article-description">
									{article.content}
								</Typography>
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
									className="read-more"
								>
									Read More
								</Button>
							</CardContent>
						</Card>
					))
				) : (
					<Typography>No articles found.</Typography>
				)}
			</div>
		</Container>
	);
}

export default Articles;
