import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import {
	Container,
	Typography,
	TextField,
	Button,
	Box,
	IconButton,
	Grid,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";
import EditIcon from "@mui/icons-material/Edit";
import Avatar from "react-avatar";
import "../scss/pages/_profile.scss";

// UserProfile component, Displays and allows updating user profile information
function UserProfile() {
	const { user } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const fetchProfile = async () => {
			if (user) {
				try {
					const token = Cookies.get("authToken");
					const { data } = await axios.get(`/users/me`, {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setProfile(data);
					setUsername(data.username || "");
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};

		fetchProfile();
	}, [user]);

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			const token = Cookies.get("authToken");
			const { data } = await axios.put(
				`/users/me`,
				{ username },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			setProfile(data);
			alert("Profile updated successfully");
		} catch (error) {
			console.error("Error updating profile:", error);
		}
	};

	if (!profile) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Container className="profile-container">
			<Avatar
				name={profile.username}
				size="100"
				round={true}
				style={{ marginBottom: "10px" }}
			/>
			<Typography variant="h4" className="profile-heading">
				{profile.username}
				<IconButton className="edit-icon">
					<EditIcon />
				</IconButton>
			</Typography>
			<Box className="profile-details">
				<form onSubmit={handleUpdate}>
					<TextField
						label="Username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						fullWidth
						margin="normal"
					/>
					<Button
						type="submit"
						variant="contained"
						color="primary"
						className="update-button"
					>
						Update Profile
					</Button>
				</form>
			</Box>
			<Grid container spacing={3} className="profile-stats">
				<Grid item className="stat-item">
					<Typography className="stat-value">
						{profile.articlesWritten || 0}
					</Typography>
					<Typography className="stat-label">Articles Written</Typography>
				</Grid>
				<Grid item className="stat-item">
					<Typography className="stat-value">
						{profile.commentsMade || 0}
					</Typography>
					<Typography className="stat-label">Comments Made</Typography>
				</Grid>
				<Grid item className="stat-item">
					<Typography className="stat-value">
						{profile.likesReceived || 0}
					</Typography>
					<Typography className="stat-label">Likes Received</Typography>
				</Grid>
			</Grid>
		</Container>
	);
}

export default UserProfile;
