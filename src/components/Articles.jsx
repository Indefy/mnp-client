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
			<Typography variant="h4">Articles</Typography>
			{articles.length > 0 ? (
				articles.map((article) => (
					<Card key={article._id} sx={{ marginTop: 2, padding: 2 }}>
						<CardMedia
							component="img"
							height="140"
							image={article.image || "/default-image.jpg"}
							alt={article.title}
						/>
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
				<Typography>No articles found.</Typography>
			)}
		</Container>
	);
}

export default Articles;
