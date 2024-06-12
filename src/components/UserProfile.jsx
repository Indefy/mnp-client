import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import {
	Container,
	Typography,
	Avatar,
	TextField,
	Button,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

function UserProfile() {
	const { user } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);
	const [username, setUsername] = useState("");

	useEffect(() => {
		const fetchProfile = async () => {
			if (user) {
				// Only fetch profile if user is logged in
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
		<Container>
			<Avatar>{profile.username[0]}</Avatar>
			<Typography variant="h4">Profile</Typography>
			<form onSubmit={handleUpdate}>
				<TextField
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary">
					Update Profile
				</Button>
			</form>
			<List>
				<ListItem>
					<ListItemText primary="Username" secondary={profile.username} />
				</ListItem>
			</List>
		</Container>
	);
}

export default UserProfile;
