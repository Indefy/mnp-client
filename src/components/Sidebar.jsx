import React from "react";
import { NavLink } from "react-router-dom";
import { List, ListItem, ListItemText, ListItemIcon } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ScienceIcon from "@mui/icons-material/Science";
import HealthAndSafetyIcon from "@mui/icons-material/HealthAndSafety";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import "../scss/components/_sidebar.scss";

const Sidebar = () => {
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
				<ListItem
					button
					component={NavLink}
					to="/category/technology"
					className="sidebar__menu__item"
				>
					<ListItemIcon>
						<ScienceIcon />
					</ListItemIcon>
					<ListItemText primary="Technology" />
				</ListItem>
				<ListItem
					button
					component={NavLink}
					to="/category/health"
					className="sidebar__menu__item"
				>
					<ListItemIcon>
						<HealthAndSafetyIcon />
					</ListItemIcon>
					<ListItemText primary="Health" />
				</ListItem>
				<ListItem
					button
					component={NavLink}
					to="/category/finance"
					className="sidebar__menu__item"
				>
					<ListItemIcon>
						<MonetizationOnIcon />
					</ListItemIcon>
					<ListItemText primary="Finance" />
				</ListItem>
			</List>
		</div>
	);
};

export default Sidebar;
