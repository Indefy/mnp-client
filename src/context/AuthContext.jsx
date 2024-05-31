import axios from "../api/axios";
import React, { createContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children, navigate }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const fetchUser = async () => {
			const token = Cookies.get("authToken");
			if (token) {
				try {
					const { data } = await axios.get("/users/me", {
						headers: {
							Authorization: `Bearer ${token}`,
						},
					});
					console.log("Fetched user data:", data);
					setUser(data);
				} catch (error) {
					console.error("Error fetching user:", error);
				}
			}
		};

		fetchUser();
	}, []);

	const login = async (username, password) => {
		try {
			const { data } = await axios.post("/users/signin", {
				username,
				password,
			});
			console.log("Sign-in response data:", data);
			Cookies.set("authToken", data.token, { expires: 30 });
			const userData = await axios.get("/users/me", {
				headers: {
					Authorization: `Bearer ${data.token}`,
				},
			});
			console.log("Fetched user data after login:", userData.data);
			setUser(userData.data);
			navigate("/");
		} catch (error) {
			console.error("Error signing in:", error);
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
