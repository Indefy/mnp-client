import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import Articles from "./components/Articles";
import CreateArticle from "./components/CreateArticle";
import ArticleDetail from "./components/ArticleDetails";
import NavigationHelper from "./components/NavigationHelper"; // Import NavigationHelper

function App() {
	return (
		<Router>
			<NavigationHelper>
				<Navbar />
				<Routes>
					<Route path="/signup" element={<SignUp />} />
					<Route path="/signin" element={<SignIn />} />
					<Route path="/create-article" element={<CreateArticle />} />
					<Route path="/articles/:id" element={<ArticleDetail />} />
					<Route path="/" element={<Articles />} />
				</Routes>
			</NavigationHelper>
		</Router>
	);
}

export default App;
