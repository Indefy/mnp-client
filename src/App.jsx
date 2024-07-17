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
import { DrawerProvider } from "./context/DrawerContext";
import "./scss/main.scss";

// Main application component
function App() {
	const [searchResults, setSearchResults] = useState([]);
	const [searchQuery, setSearchQuery] = useState("");

	return (
		<AuthProvider>
			<DrawerProvider>
				<Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
					<Navbar
						setSearchResults={setSearchResults}
						setSearchQuery={setSearchQuery}
					/>
					<Box sx={{ display: "flex", flexGrow: 1 }}>
						<Sidebar />
						<Box
							component="main"
							sx={{
								flexGrow: 1,
								p: 3,
								marginLeft: { sm: 240 },
								overflowY: "auto",
								display: "flex",
								flexDirection: "column",
								alignItems: "center",
							}}
						>
							<Routes>
								<Route
									path="/"
									element={
										<Articles
											searchResults={searchResults}
											searchQuery={searchQuery}
										/>
									}
								/>
								<Route path="/signup" element={<SignUp />} />
								<Route path="/signin" element={<SignIn />} />
								<Route path="/create-article" element={<CreateArticle />} />
								<Route path="/articles/:id" element={<ArticleDetail />} />
								<Route
									path="/category/:category"
									element={
										<CategoryPage
											searchResults={searchResults}
											searchQuery={searchQuery}
										/>
									}
								/>
								<Route path="/profile" element={<UserProfile />} />
							</Routes>
						</Box>
					</Box>
				</Box>
			</DrawerProvider>
		</AuthProvider>
	);
}

export default App;
