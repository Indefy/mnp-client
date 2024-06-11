import React from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemText,
	Box,
	Toolbar,
	Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useDrawer } from "../context/DrawerContext";

const drawerWidth = 240;

function Sidebar() {
	const { mobileOpen, handleDrawerToggle } = useDrawer();
	const categories = [
		"technology",
		"health",
		"finance",
		"entertainment",
		"sports",
	];

	const drawer = (
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
			</List>
		</div>
	);

	return (
		<Box
			component="nav"
			sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
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
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
			>
				{drawer}
			</Drawer>
			<Drawer
				variant="permanent"
				sx={{
					display: { xs: "none", sm: "block" },
					"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
				}}
				open
			>
				{drawer}
			</Drawer>
		</Box>
	);
}

export default Sidebar;
