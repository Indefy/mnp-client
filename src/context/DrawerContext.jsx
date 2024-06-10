import React, { createContext, useState, useContext } from "react";

const DrawerContext = createContext();

export const DrawerProvider = ({ children }) => {
	const [mobileOpen, setMobileOpen] = useState(false);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};

	return (
		<DrawerContext.Provider value={{ mobileOpen, handleDrawerToggle }}>
			{children}
		</DrawerContext.Provider>
	);
};

export const useDrawer = () => useContext(DrawerContext);
