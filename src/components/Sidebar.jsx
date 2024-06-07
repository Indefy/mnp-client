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

const drawerWidth = 240;

function Sidebar({ mobileOpen, handleDrawerToggle }) {
	const drawer = (
		<div>
			<Toolbar />
			<Divider />
			<List>
				<ListItem button component={Link} to="/">
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem button component={Link} to="/technology">
					<ListItemText primary="Technology" />
				</ListItem>
				<ListItem button component={Link} to="/health">
					<ListItemText primary="Health" />
				</ListItem>
				<ListItem button component={Link} to="/finance">
					<ListItemText primary="Finance" />
				</ListItem>
				<ListItem button component={Link} to="/entertainment">
					<ListItemText primary="Entertainment" />
				</ListItem>
				<ListItem button component={Link} to="/sports">
					<ListItemText primary="Sports" />
				</ListItem>
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
