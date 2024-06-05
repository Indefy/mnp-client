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
	styled,
} from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import "../scss/components/_create-article.scss";

const StyledContainer = styled(Container)(({ theme }) => ({
	marginTop: theme.spacing(4),
	backgroundColor: "#fff",
	boxShadow: theme.shadows[1],
	padding: theme.spacing(4),
	maxWidth: 800,
	margin: "20px auto",
}));

const StyledButton = styled(Button)(({ theme }) => ({
	marginTop: theme.spacing(2),
}));

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
		<StyledContainer>
			<Typography variant="h4">Create Article</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Content"
					value={content}
					onChange={(e) => setContent(e.target.value)}
					required
					multiline
					rows={4}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Image URL"
					value={image}
					onChange={(e) => setImage(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<FormControl fullWidth required margin="normal">
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
				<StyledButton type="submit" variant="contained" color="primary">
					Create
				</StyledButton>
			</form>
		</StyledContainer>
	);
}

export default CreateArticle;
