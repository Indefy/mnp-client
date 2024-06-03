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
	const [email, setEmail] = useState("");

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
					setUsername(data.username);
					setEmail(data.email);
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};

		fetchProfile();
	}, [user]);

	const handleUpdate = async () => {
		try {
			const token = Cookies.get("authToken");
			const { data } = await axios.put(
				`/users/me`,
				{ username, email },
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
			<form>
				<TextField
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					fullWidth
					margin="normal"
				/>
				<Button variant="contained" color="primary" onClick={handleUpdate}>
					Update Profile
				</Button>
			</form>
			<List>
				<ListItem>
					<ListItemText primary="Username" secondary={profile.username} />
				</ListItem>
				<ListItem>
					<ListItemText primary="Email" secondary={profile.email} />
				</ListItem>
			</List>
		</Container>
	);
}

export default UserProfile;
