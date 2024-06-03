import React, { useState, useContext } from "react";
import axios from "../api/axios";
import { TextField, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";

function SignUp() {
	//  States for the SignUp logic handling
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);

	//  Handle the submission for the SignUp page logic
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("/users/signup", { username, password });
			await login(username, password);
			alert("User created and logged in");
			window.location.reload();
		} catch (error) {
			console.error("Error signing up:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4">Sign Up</Typography>
			<form onSubmit={handleSubmit}>
				<TextField
					label="Username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>
				<TextField
					label="Password"
					type="password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					fullWidth
					margin="normal"
				/>
				<Button type="submit" variant="contained" color="primary">
					Sign Up
				</Button>
			</form>
		</Container>
	);
}

export default SignUp;
