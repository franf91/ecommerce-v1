"use client";
import React, { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
export default function AllTag() {
	// Create a state variable to track the dropdown state
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

	// Function to toggle the dropdown state and change display property
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
		// Change the display property based on the dropdown state
		const dropdownContainer = document.querySelector(".dropdown-container");
		if (dropdownContainer) {
			dropdownContainer.style.display = isDropdownOpen ? "block" : "none";
		}
	};
	return (
		<div>
			<div className="all-container" onClick={toggleDropdown}>
				<div>
					<MenuIcon sx={{ fontSize: 28 }} />
				</div>
			</div>
		</div>
	);
}
