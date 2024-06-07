import React, { useState } from "react";
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
import "./scss/main.scss";

function App() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<AuthProvider>
			<Box sx={{ display: "flex" }}>
				<Navbar handleDrawerToggle={handleDrawerToggle} />
				<Sidebar
					mobileOpen={mobileOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
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
		</AuthProvider>
	);
}

export default App;
