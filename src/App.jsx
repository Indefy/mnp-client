import React from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreateArticle from "./components/CreateArticle";
import ArticleDetail from "./components/ArticleDetails";
import CategoryPage from "./components/CategoryPage";
import UserProfile from "./components/UserProfile";
import { AuthProvider } from "./context/AuthContext";
import { DrawerProvider } from "./context/DrawerContext";
import "./scss/main.scss";

// Main application component
function App() {
	/* The Routes component from react-router-dom defines different routes for the application, each rendering a specific component. */

	return (
		<AuthProvider>
			<DrawerProvider>
				<Box sx={{ display: "flex" }}>
					<Navbar />
					<Sidebar />
					<Box
						component="main"
						sx={{ flexGrow: 1, p: 3, marginLeft: { sm: 240 } }}
					>
						<Routes>
							<Route path="/" element={<Articles />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/create-article" element={<CreateArticle />} />
							<Route path="/articles/:id" element={<ArticleDetail />} />
							<Route path="/category/:category" element={<CategoryPage />} />
							<Route path="/profile" element={<UserProfile />} />
						</Routes>
					</Box>
				</Box>
			</DrawerProvider>
		</AuthProvider>
	);
}

export default App;
