import React, { useState } from "react";
import axios from "../api/axios";
import {
	TextField,
	Button,
	Container,
	Typography,
	MenuItem,
	Select,
	InputLabel,
	FormControl,
	Grid,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../scss/components/_create-article.scss";

// CreateArticle component, Allows authenticated users to create a new article
function CreateArticle() {
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [category, setCategory] = useState("");
	const [image, setImage] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const token = Cookies.get("authToken");
			await axios.post(
				"/articles",
				{ title, content, category, image },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			alert("Article created");
			navigate("/");
			window.location.reload();
		} catch (error) {
			console.error("Error creating article:", error);
		}
	};

	return (
		<Container className="create-article-container">
			<Typography variant="h4" className="create-article-heading">
				Create Article
			</Typography>
			<form onSubmit={handleSubmit} className="create-article-form">
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<TextField
							label="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Content"
							value={content}
							onChange={(e) => setContent(e.target.value)}
							required
							multiline
							rows={4}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							label="Image URL"
							value={image}
							onChange={(e) => setImage(e.target.value)}
							fullWidth
						/>
					</Grid>
					<Grid item xs={12}>
						<FormControl fullWidth required>
							<InputLabel>Category</InputLabel>
							<Select
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							>
								<MenuItem value="Technology">Technology</MenuItem>
								<MenuItem value="Health">Health</MenuItem>
								<MenuItem value="Finance">Finance</MenuItem>
								<MenuItem value="Sports">Sports</MenuItem>
								<MenuItem value="Entertainment">Entertainment</MenuItem>
							</Select>
						</FormControl>
					</Grid>
					<Grid item xs={12}>
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className="create-article-button"
						>
							Create
						</Button>
					</Grid>
				</Grid>
			</form>
		</Container>
	);
}

export default CreateArticle;
