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
	Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import "../scss/components/_articles.scss";

function Articles() {
	const [articles, setArticles] = useState([]);
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

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

	const displayedArticles = searchQuery ? searchResults : articles;

	return (
		<>
			<Navbar
				setSearchResults={setSearchResults}
				setSearchQuery={setSearchQuery}
			/>
			<Container maxWidth="lg" sx={{ marginTop: 4 }}>
				<Typography variant="h4" gutterBottom>
					Your News
				</Typography>
				<Grid container spacing={3} className="articles-grid">
					{displayedArticles.length > 0 ? (
						displayedArticles.map((article) => (
							<Grid item xs={12} sm={6} md={4} lg={3} key={article._id}>
								<Card className="article-card">
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
										<Typography className="article-description" component="p">
											{article.content}
										</Typography>
										<Chip label={article.category} sx={{ marginTop: 1 }} />
										<Typography variant="caption" display="block" gutterBottom>
											By{" "}
											{article.author && article.author.username
												? article.author.username
												: "deleted user"}{" "}
											on {new Date(article.date).toLocaleDateString()}
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
							</Grid>
						))
					) : (
						<Typography>No articles found.</Typography>
					)}
				</Grid>
			</Container>
		</>
	);
}

export default Articles;
