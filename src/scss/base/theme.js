import { createTheme } from "@mui/material/styles";

// Create a custom theme using MUI's createTheme function
const theme = createTheme({
	palette: {
		primary: {
			main: "#007bff",
		},
		secondary: {
			main: "#6c757d",
		},
		background: {
			default: "#f8f9fa",
		},
		text: {
			primary: "#343a40",
		},
	},
	typography: {
		fontFamily: "Roboto, sans-serif",
		h1: {
			fontFamily: "Montserrat, sans-serif",
			color: "#2c3e50",
		},
	},
	spacing: 0.3,
});

export default theme;
