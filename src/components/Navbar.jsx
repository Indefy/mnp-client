import React, { useContext, useState } from "react";
import {
	AppBar,
	Toolbar,
	Button,
	Menu,
	MenuItem,
	IconButton,
	InputBase,
	Box,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../context/AuthContext.jsx";
import { useMediaQuery } from "react-responsive";
import { fetchArticlesBySearchQuery } from "../api/api"; // Ensure this API function exists

const Search = styled("div")(({ theme }) => ({
	position: "relative",
	borderRadius: theme.shape.borderRadius,
	backgroundColor: "rgba(255, 255, 255, 0.15)",
	"&:hover": {
		backgroundColor: "rgba(255, 255, 255, 0.25)",
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: "100%",
	[theme.breakpoints.up("sm")]: {
		marginLeft: theme.spacing(3),
		width: "auto",
	},
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: "100%",
	position: "absolute",
	pointerEvents: "none",
	display: "flex",
	alignItems: "center",
	justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: "inherit",
	"& .MuiInputBase-input": {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create("width"),
		width: "100%",
		[theme.breakpoints.up("md")]: {
			width: "20ch",
		},
	},
}));

function Navbar({ handleDrawerToggle, setSearchResults, setSearchQuery }) {
	const { user, logout } = useContext(AuthContext);
	const [anchorEl, setAnchorEl] = React.useState(null);
	const [searchInput, setSearchInput] = useState("");

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

	const handleSearchChange = async (event) => {
		const query = event.target.value;
		setSearchInput(query);
		setSearchQuery(query);

		if (query) {
			try {
				const results = await fetchArticlesBySearchQuery(query);
				setSearchResults(results);
			} catch (error) {
				console.error("Error fetching search results:", error);
			}
		} else {
			setSearchResults([]); // Clear search results when query is empty
		}
	};

	return (
		<AppBar
			position="fixed"
			sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
		>
			<Toolbar>
				{isMobile && (
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						sx={{ marginRight: 5 }}
					>
						<MenuIcon />
					</IconButton>
				)}
				<Search>
					<SearchIconWrapper>
						<SearchIcon />
					</SearchIconWrapper>
					<StyledInputBase
						placeholder="Search…"
						inputProps={{ "aria-label": "search" }}
						value={searchInput}
						onChange={handleSearchChange}
					/>
				</Search>
				<Box sx={{ flexGrow: 1 }} />
				{!isMobile && (
					<>
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
									<MenuItem
										onClick={handleClose}
										component={Link}
										to="/profile"
									>
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
					</>
				)}
			</Toolbar>
		</AppBar>
	);
}

export default Navbar;
