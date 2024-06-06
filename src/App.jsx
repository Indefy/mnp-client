import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Articles from "./components/Articles";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import CreateArticle from "./components/CreateArticle";
import ArticleDetail from "./components/ArticleDetails";
import CategoryPage from "./components/CategoryPage";
import UserProfile from "./components/UserProfile";
import "./scss/main.scss";
import { AuthProvider } from "./context/AuthContext";
import { Box, CssBaseline } from "@mui/material";
import { styled } from "@mui/material/styles";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		padding: theme.spacing(3),
		marginLeft: open ? drawerWidth : 0,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: `calc(100% - ${open ? drawerWidth : 0}px)`,
	})
);

function App() {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<AuthProvider>
			<Box sx={{ display: "flex" }}>
				<CssBaseline />
				<Navbar handleDrawerToggle={handleDrawerToggle} />
				<Sidebar
					mobileOpen={mobileOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
				<Main open={!mobileOpen}>
					<Routes>
						<Route path="/" element={<Articles />} />
						<Route path="/signup" element={<SignUp />} />
						<Route path="/signin" element={<SignIn />} />
						<Route path="/create-article" element={<CreateArticle />} />
						<Route path="/articles/:id" element={<ArticleDetail />} />
						<Route path="/category/:category" element={<CategoryPage />} />
						<Route path="/profile" element={<UserProfile />} />
					</Routes>
				</Main>
			</Box>
		</AuthProvider>
	);
}

export default App;
