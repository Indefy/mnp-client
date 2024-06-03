import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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

function App() {
	return (
		<Router>
			<AuthProvider>
				<div className="app">
					<Sidebar />
					<div className="main-content">
						<Navbar />
						<Routes>
							<Route path="/" element={<Articles />} />
							<Route path="/signup" element={<SignUp />} />
							<Route path="/signin" element={<SignIn />} />
							<Route path="/create-article" element={<CreateArticle />} />
							<Route path="/articles/:id" element={<ArticleDetail />} />
							<Route path="/category/:category" element={<CategoryPage />} />
							<Route path="/profile" element={<UserProfile />} />
						</Routes>
					</div>
				</div>
			</AuthProvider>
		</Router>
	);
}

export default App;
