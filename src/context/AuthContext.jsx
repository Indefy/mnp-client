import React, { createContext, useState, useEffect } from "react";
import axios from "../api/axios";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

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
			Cookies.set("authToken", data.token, { expires: 30 }); // Set token with expiration
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
