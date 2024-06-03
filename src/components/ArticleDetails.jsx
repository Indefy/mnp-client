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

	useEffect(() => {
		const fetchArticle = async () => {
			try {
				const { data } = await axios.get(`/articles/${id}`);
				setArticle(data);
			} catch (error) {
				console.error("Error fetching article:", error);
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

	if (!article) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Container>
			<Typography variant="h4">{article.title}</Typography>
			<Typography variant="h6">{article.content}</Typography>
			<Typography variant="caption">
				By {article.author.username} on{" "}
				{new Date(article.date).toLocaleDateString()}
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
							secondary={`By ${comment.user.username} on ${new Date(
								comment.date
							).toLocaleDateString()}`}
						/>
					</ListItem>
				))}
			</List>
		</Container>
	);
}

export default ArticleDetail;
