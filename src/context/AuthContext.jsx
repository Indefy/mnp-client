import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";

// Creating context for authentication
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	// State to manage the current authenticated user
	const [user, setUser] = useState(null);

	// Check if there is a valid authentication token on the users's cookies
	useEffect(() => {
		const checkAuthToken = async () => {
			const token = Cookies.get("authToken");
			if (token) {
				try {
					const { data } = await axios.get("/users/me", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					setUser(data);
				} catch (error) {
					console.error("Error fetching user:", error);
					Cookies.remove("authToken");
				}
			}
		};

		checkAuthToken();
	}, []);

	// Login function to authenticate the user and set the auth token with expiration
	const login = async (username, password) => {
		try {
			const { data, status } = await axios.post(
				"/users/signin",
				{ username, password },
				{
					headers: {
						"Content-Type": "application/json",
					},
					withCredentials: true,
				}
			);
			if (status !== 200) {
				throw new Error("Login failed");
			}
			console.log("Login successful, setting authToken");
			Cookies.set("authToken", data.token, { expires: 30 });
			const userData = await axios.get("/users/me", {
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
				withCredentials: true,
			});
			setUser(userData.data);
		} catch (error) {
			console.error("Error signing in:", error);
			throw error;
		}
	};

	// Logout function to clear the auth token and reset the user state
	const logout = async () => {
		try {
			const token = Cookies.get("authToken");
			await axios.post(
				"/users/logout",
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			Cookies.remove("authToken");
			setUser(null);
			window.location.reload();
		} catch (error) {
			console.error("Error logging out:", error);
		}
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
