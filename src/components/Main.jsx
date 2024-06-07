import { styled } from "@mui/material/styles";
import { useMediaQuery } from "@mui/material";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => {
		const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
		return {
			flexGrow: 1,
			padding: theme.spacing(3),
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			marginLeft: isMobile ? 0 : `-${drawerWidth}px`,
			...(open && {
				transition: theme.transitions.create("margin", {
					easing: theme.transitions.easing.easeOut,
					duration: theme.transitions.duration.enteringScreen,
				}),
				marginLeft: isMobile ? 0 : 0,
			}),
		};
	}
);

export default Main;
