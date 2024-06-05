import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { fetchCategories } from "../api/api";
import "../scss/components/_sidebar.scss";

// Icons for different categories
import ScienceIcon from "@mui/icons-material/Science";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import MovieIcon from "@mui/icons-material/Movie";

const categoryIcons = {
	technology: <ScienceIcon />,
	health: <HealthAndSafetyIcon />,
	finance: <MonetizationOnIcon />,
	sports: <SportsSoccerIcon />,
	entertainment: <MovieIcon />,
};

const Sidebar = () => {
	const [categories, setCategories] = useState([]);

	useEffect(() => {
		const fetchAllCategories = async () => {
			try {
				const categories = await fetchCategories();
				setCategories(categories);
			} catch (error) {
				console.error("Error fetching categories:", error);
			}
		};

		fetchAllCategories();
	}, []);

	return (
		<div className="sidebar">
			<img src="/path-to-your-logo.png" alt="Logo" className="sidebar__logo" />
			<List className="sidebar__menu">
				<ListItem
					button
					component={NavLink}
					to="/"
					className="sidebar__menu__item"
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				{categories.map((category) => (
					<ListItem
						button
						component={NavLink}
						to={`/category/${category}`}
						className="sidebar__menu__item"
						key={category}
					>
						<ListItemIcon>
							{categoryIcons[category.toLowerCase()] || <HomeIcon />}
						</ListItemIcon>
						<ListItemText
							primary={category.charAt(0).toUpperCase() + category.slice(1)}
						/>
					</ListItem>
				))}
			</List>
		</div>
	);
};

export default Sidebar;
