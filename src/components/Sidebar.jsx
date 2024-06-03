import React from "react";
import { NavLink } from "react-router-dom";
import "../scss/components/_sidebar.scss";

const Sidebar = () => {
	return (
		<div className="sidebar">
			<img src="/path-to-your-logo.png" alt="Logo" className="sidebar__logo" />
			<ul className="sidebar__menu">
				<li className="sidebar__menu__item">
					<NavLink
						to="/"
						className="sidebar__menu__item__link"
						activeclassname="active"
					>
						Home
					</NavLink>
				</li>
				<li className="sidebar__menu__item">
					<NavLink
						to="/category/technology"
						className="sidebar__menu__item__link"
						activeclassname="active"
					>
						Technology
					</NavLink>
				</li>
				<li className="sidebar__menu__item">
					<NavLink
						to="/category/health"
						className="sidebar__menu__item__link"
						activeclassname="active"
					>
						Health
					</NavLink>
				</li>
				<li className="sidebar__menu__item">
					<NavLink
						to="/category/finance"
						className="sidebar__menu__item__link"
						activeclassname="active"
					>
						Finance
					</NavLink>
				</li>
			</ul>
		</div>
	);
};

export default Sidebar;
