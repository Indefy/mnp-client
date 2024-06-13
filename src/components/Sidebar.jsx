import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Box,
	Toolbar,
	Divider,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDrawer } from "../context/DrawerContext";

const Sidebar = () => {
	const { mobileOpen, handleDrawerToggle } = useDrawer();
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	const categories = [
		"technology",
		"health",
		"finance",
		"entertainment",
		"sports",
	];
	const userLinks = [
		{ label: "Profile", to: "/profile" },
		{ label: "My Articles", to: "/my-articles" },
		{ label: "Create Article", to: "/create-article" },
		{ label: "Logout", to: "/logout" },
	];

	const drawerContent = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<ListItem button component={Link} to="/">
					<ListItemText primary="Home" />
				</ListItem>
				{categories.map((category) => (
					<ListItem
						button
						component={Link}
						to={`/category/${category}`}
						key={category}
					>
						<ListItemText
							primary={category.charAt(0).toUpperCase() + category.slice(1)}
						/>
					</ListItem>
				))}
				<Divider />
				{/* Conditionally render user links only on mobile */}
				{isMobile &&
					userLinks.map((link) => (
						<ListItem button key={link.label} component={Link} to={link.to}>
							<ListItemText primary={link.label} />
						</ListItem>
					))}
			</List>
		</div>
	);

	return (
		<Box
			component="nav"
			sx={{ width: { sm: 240 }, flexShrink: { sm: 0 } }}
			aria-label="mailbox folders"
		>
			<Drawer
				variant="temporary"
				open={mobileOpen}
				onClose={handleDrawerToggle}
				ModalProps={{
					keepMounted: true,
				}}
				sx={{
					display: { xs: "block", sm: "none" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
				}}
			>
				{drawerContent}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
				}}
				open
			>
				{drawerContent}
			</Drawer>
		</Box>
	);
};

export default Sidebar;
