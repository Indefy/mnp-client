import React, { useState, useEffect, useContext } from "react";
import axios from "../api/axios";
import {
	Container,
	Typography,
	Avatar,
	List,
	ListItem,
	ListItemText,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import Cookies from "js-cookie";

function UserProfile() {
	const { user } = useContext(AuthContext);
	const [profile, setProfile] = useState(null);

	useEffect(() => {
		const fetchProfile = async () => {
			if (user) {
				try {
					const { data } = await axios.get(`/users/me`, {
						headers: {
							Authorization: `Bearer ${Cookies.get("authToken")}`,
						},
					});
					setProfile(data);
				} catch (error) {
					console.error("Error fetching profile:", error);
				}
			}
		};

		fetchProfile();
	}, [user]);

	if (!profile) {
		return <Typography>Loading...</Typography>;
	}

	return (
		<Container>
			<Avatar>{profile.username[0]}</Avatar>
			<Typography variant="h4">{profile.username}</Typography>
			<List>
				<ListItem>
					<ListItemText primary="Email" secondary={profile.email} />
				</ListItem>
			</List>
		</Container>
	);
}

export default UserProfile;
