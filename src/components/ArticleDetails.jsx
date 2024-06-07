import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import {
	Container,
	Typography,
	Button,
	TextField,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import Cookies from "js-cookie";
import "../scss/components/_article-details.scss";

function ArticleDetail() {
	const { id } = useParams();
	const { user } = useContext(AuthContext);
	const [article, setArticle] = useState(null);
	const [comment, setComment] = useState("");
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const { data } = await axios.get(`/articles/${id}`);
				setArticle(data);
			} catch (error) {
				console.error("Error fetching article:", error);
				setError("Error fetching article");
			}
		};

		fetchArticle();
	}, [id]);

	const handleCommentSubmit = async (e) => {
		e.preventDefault();
		if (!user) {
			alert("Please sign in to post a comment.");
			return;
		}
		try {
			const token = Cookies.get("authToken");
			const { data } = await axios.post(
				`/articles/${id}/comments`,
				{ content: comment },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setArticle(data);
			setComment("");
		} catch (error) {
			console.error("Error posting comment:", error);
		}
	};

	const handleLike = async () => {
		if (!user) {
			alert("Please sign in to like the article.");
			return;
		}
		try {
			const token = Cookies.get("authToken");
			const { data } = await axios.post(
				`/articles/${id}/like`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setArticle(data);
		} catch (error) {
			console.error("Error liking article:", error);
		}
	};

	const handleBookmark = async () => {
		if (!user) {
			alert("Please sign in to bookmark the article.");
			return;
		}
		try {
			const token = Cookies.get("authToken");
			const { data } = await axios.post(
				`/articles/${id}/bookmark`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setArticle(data);
		} catch (error) {
			console.error("Error bookmarking article:", error);
		}
	};

	if (error) {
		return (
			<Container sx={{ marginTop: 8 }}>
				<Typography variant="h4" color="error">
					{error}
				</Typography>
			</Container>
		);
	}

	if (!article) {
		return (
			<Container sx={{ marginTop: 8 }}>
				<Typography variant="h4">Loading...</Typography>
			</Container>
		);
	}

	return (
		<Container sx={{ paddingTop: "100px" }}>
			<Typography variant="h4" gutterBottom>
				{article.title}
			</Typography>
			<Typography variant="body1" paragraph>
				{article.content}
			</Typography>
			<Typography variant="caption">
				By{" "}
				{article.author && article.author.username
					? article.author.username
					: "deleted user"}{" "}
				on {new Date(article.date).toLocaleDateString()}
			</Typography>
			<div>
				<Button onClick={handleLike}>
					{user && article.likes.includes(user.userId) ? "Unlike" : "Like"} (
					{article.likes.length})
				</Button>
				<Button onClick={handleBookmark}>
					{user && article.bookmarks.includes(user.userId)
						? "Remove Bookmark"
						: "Bookmark"}{" "}
					({article.bookmarks.length})
				</Button>
			</div>
			<form onSubmit={handleCommentSubmit}>
				<TextField
					label="Add a comment"
					value={comment}
					onChange={(e) => setComment(e.target.value)}
					required
					fullWidth
					margin="normal"
					disabled={!user}
				/>
				<Button
					type="submit"
					variant="contained"
					color="primary"
					disabled={!user}
				>
					Comment
				</Button>
			</form>
			<List>
				{article.comments.map((comment) => (
					<ListItem key={comment._id}>
						<ListItemText
							primary={comment.content}
							secondary={`By ${
								comment.user && comment.user.username
									? comment.user.username
									: "deleted user"
							} on ${new Date(comment.date).toLocaleDateString()}`}
						/>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default ArticleDetail;
