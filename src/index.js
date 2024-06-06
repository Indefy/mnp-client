import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// Creating the root element to render the React application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application within the root element
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</React.StrictMode>
);

// Measuring performance in the app
// Pass a function to log results or send to an analytics endpoint.
// Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
