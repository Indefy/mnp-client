import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext.jsx";

const NavigationHelper = ({ children }) => {
	const navigate = useNavigate();
	return <AuthProvider navigate={navigate}>{children}</AuthProvider>;
};

export default NavigationHelper;
