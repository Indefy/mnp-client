import React, { useContext } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	Button,
	Menu,
	MenuItem,
	IconButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { AuthContext } from "../context/AuthContext.jsx";

function Navbar() {
	const { user, logout } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<AppBar position="static">
			<Toolbar>
				<Typography variant="h6" style={{ flexGrow: 1 }}>
					Modern News Platform
				</Typography>
				<Button color="inherit" component={Link} to="/">
					Home
				</Button>
				{user ? (
					<>
						<IconButton
							edge="end"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleMenu}
							color="inherit"
						>
							<AccountCircle />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorEl}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorEl)}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose} component={Link} to="/profile">
								Profile
							</MenuItem>
							<MenuItem
								onClick={handleClose}
								component={Link}
								to="/my-articles"
							>
								My Articles
							</MenuItem>
							<MenuItem
								onClick={() => {
									logout();
									handleClose();
								}}
							>
								Logout
							</MenuItem>
						</Menu>
					</>
				) : (
					<>
						<Button color="inherit" component={Link} to="/signin">
							Sign In
						</Button>
						<Button color="inherit" component={Link} to="/signup">
							Sign Up
						</Button>
					</>
				)}
				<Button color="inherit" component={Link} to="/create-article">
					Create Article
				</Button>
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
