import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

// Defining the width of the drawer
const drawerWidth = 240;

//Main component is a styled component that represents the main content area of the application.
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => {
		const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
		const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
		// const isDesktop = useMediaQuery(theme.breakpoints.up("md"));

		return {
			// Styles for the main component
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			// Adjusting the margin-left based on the screen size and drawer state
			marginLeft: isMobile
				? 0
				: isTablet
				? `-${drawerWidth / 2}px`
				: `-${drawerWidth}px`,
			// Additional styles when the drawer is open
			...(open && {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: 0,
			}),
		};
	}
);

export default Main;
