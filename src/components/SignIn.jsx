import React, { useState, useContext } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";

function SignIn() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const { login } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await login(username, password);
			alert("Signed in successfully");
			navigate("/");
		} catch (error) {
			console.error("Error signing in:", error);
		}
	};

	return (
		<Container>
			<Typography variant="h4">Sign In</Typography>
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
					Sign In
				</Button>
			</form>
		</Container>
	);
}

export default SignIn;
