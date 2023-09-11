"use client";
import React from "react";

export default function AddData() {
	const handleAddData = async () => {
		try {
			const data = require("data.json"); // Import data from your JSON file

			const response = await fetch("../../api/addData", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					data: data, // Pass the data from your JSON file in the request body
				}),
			});

			// Handle the response here
			if (response.ok) {
				// Data added successfully
				console.log("Data added successfully!");
			} else {
				// Handle the error if the request fails
				console.error("Error adding data");
			}
		} catch (error) {
			console.error("Error reading data from JSON file:", error);
		}
	};

	return (
		<button className="product-button" onClick={handleAddData}>
			Add Data
		</button>
	);
}
