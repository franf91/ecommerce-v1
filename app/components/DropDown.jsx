"use client";
import React, { useState } from "react";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
export default function DropDown() {
	// Create a state variable to track the dropdown state
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isDropdownOpen2, setIsDropdownOpen2] = useState(false);

	// Function to toggle the dropdown state and change display property
	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
		// Change the display property based on the dropdown state
		const dropdownContainer = document.querySelector(".dropdown-container");
		if (dropdownContainer) {
			dropdownContainer.style.display = isDropdownOpen ? "none" : "block";
		}
	};

	const toggleDropdown2 = () => {
		setIsDropdownOpen2(false);
		// Change the display property based on the dropdown state
		const dropdownContainer = document.querySelector(".dropdown-container");
		if (dropdownContainer) {
			dropdownContainer.style.display = "none";
		}
	};

	return (
		<div className="dropdown-container">
			<div className="dropdown-x" onClick={toggleDropdown}>
				<CloseIcon sx={{ fontSize: 48 }} />
			</div>
			<Link href="/site/[category]" as="/camera">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Camera
				</div>
			</Link>
			<Link href="/site/[category]" as="/computer">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Computer
				</div>
			</Link>
			<Link href="/site/[category]" as="/furniture">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Furniture
				</div>
			</Link>
			<Link href="/site/[category]" as="/exercise">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Exercise Equipment
				</div>
			</Link>
			<Link href="/site/[category]" as="/television">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Television
				</div>
			</Link>
			<Link href="/site/[category]" as="/kitchen">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Kitchen
				</div>
			</Link>
			<Link href="/site/[category]" as="/automotive">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Automotive
				</div>
			</Link>
			<Link href="/site/[category]" as="/travel">
				<div className="dropdown-item" onClick={toggleDropdown2}>
					Travel
				</div>
			</Link>
		</div>
	);
}
