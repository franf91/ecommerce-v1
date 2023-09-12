"use client";
import { usePathname } from "next/navigation";
import { trimStart } from "lodash";
import Link from "next/link";
import { capitalize } from "lodash";
import React, { useState, useEffect, useRef } from "react";
import Rating from "@mui/material/Rating";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

export default function Page() {
	const pathname = usePathname();

	const cleanPathname = trimStart(pathname, "/");
	const pageTitle = capitalize(cleanPathname);
	const [category, setCategory] = useState({
		title: cleanPathname,
	});

	console.log(cleanPathname);

	const [items, setItems] = useState([]);

	const getItems = async () => {
		const response = await fetch("../../api/getProducts", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(category),
		});

		const { products } = await response.json();
		setItems(products);
	};

	useEffect(() => {
		getItems(); // Run getItems when cleanPathname is available
	}, []);

	return (
		<div>
			<Link href="/[item]" as={`${cleanPathname}`}>
				<div className="items-title">{pageTitle}</div>
			</Link>
			<div className="items-banner">
				<img src={`../../img/${pageTitle}.jpg`}></img>
			</div>

			<div className="items-container">
				{items.map((item) => (
					<div className="items-card-container" key={item.id}>
						<Link href="/[item]" as={`${cleanPathname}/${item.id}`}>
							<div className="items-card">
								<div className="item-card-img">
									<img src={`../../img/${category.title}/${item.img}`}></img>
								</div>
								<div>
									<div className="item-name">{item.name}</div>
									<div className="item-rating">
										<Rating
											name="product-rating"
											value={item.averageRating}
											precision={0.5}
											readOnly
											size="small"
										/>
										<p>({item.ratings.length} Reviews)</p>
									</div>

									<div className="item-price">${item.price}</div>
									<div className="item-available">
										<CheckOutlinedIcon
											style={{ fontSize: "18px", color: "green" }}
										/>
										<div>Available to ship</div>
									</div>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
}
