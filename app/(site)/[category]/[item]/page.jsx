"use client";
import { usePathname } from "next/navigation";
import { trimStart } from "lodash";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Rating from "@mui/material/Rating";
import AddCart from "@/app/components/AddCart";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function Page() {
	const pathname = usePathname();
	const lastSlashIndex = pathname.lastIndexOf("/");
	const cleanPathname =
		lastSlashIndex !== -1 ? pathname.substring(lastSlashIndex + 1) : "";

	const parts = pathname.split("/");
	const category = parts[1];

	const [itemID, setItemID] = useState({
		id: cleanPathname,
	});

	const [cat, setcat] = useState(category);

	const [item, setItem] = useState([]);

	const getItem = async () => {
		const response = await fetch("../../api/getItem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(itemID),
		});

		const { product } = await response.json();
		setItem(product);
	};

	useEffect(() => {
		getItem(); // Run getItems when cleanPathname is available
	}, [itemID]);

	return (
		<div>
			{item !== null && (
				<>
					<div className="product-navigation">
						<div>
							<Link className="product-navigation-item" href="../">
								home
							</Link>
						</div>
						<div>
							<KeyboardArrowRightOutlinedIcon style={{ fontSize: "18px" }} />
						</div>
						<div>
							<Link
								className="product-navigation-item"
								href="/[category]"
								as={`/${category}`}
							>
								{category}
							</Link>
						</div>
						<div>
							<KeyboardArrowRightOutlinedIcon style={{ fontSize: "18px" }} />
						</div>
						<div>product details</div>
					</div>
					<div className="product-container">
						<div className="product-item-container">
							<div className="product-info">
								<div className="product-name">{item.name}</div>
								<div className="product-rating">
									<Rating
										name="product-rating"
										value={item.averageRating || 0}
										precision={0.5}
										readOnly
										size="small"
									/>
									<Link href="">
										<div className="product-rating">
											<p className="product-average-rating">
												{item.averageRating.toFixed(2)}
											</p>
											<p className="product-average-review">
												({item.ratings?.length} Reviews)
											</p>
										</div>
									</Link>
								</div>
								<div>
									<Link
										className="product-review-link"
										href=""
										as={`${cleanPathname}/review`}
									>
										Write your review
										<KeyboardArrowRightOutlinedIcon
											style={{ fontSize: "18px" }}
										/>
									</Link>
								</div>
								<div className="product-price">${item.price}</div>
							</div>

							<div className="product-img">
								<img src={`../../img/${item.category}/${item.img}`}></img>
							</div>

							<div className="product-overview">
								<p className="product-overview-title">Overview</p>
								<p className="product-overview-desc">{item.description}</p>
							</div>

							<div className="product-button-container">
								<Link href="" as={`${cleanPathname}/itemAdd`}>
									<AddCart itemId={itemID.id} itemPrice={item.price} />
								</Link>
							</div>

							<div className="product-review">
								<div className="product-review-title">Customer Reviews</div>
								<div>
									<Link href="" as={`${cleanPathname}/review`}>
										<button className="product-review-button">
											Write your review
										</button>
									</Link>
								</div>
							</div>
						</div>
					</div>
					<div className="user-review-container">
						{item.ratings &&
							item.ratings.map((rating, index) => (
								<div className="user-review" key={index}>
									<div className="user-review-title">
										<Rating
											name="product-rating"
											value={rating.overallRating || 0}
											readOnly
											size="small"
										/>
										{rating.title}
									</div>
									<div>
										Reviewed by {rating.nickname} - {rating.date}
									</div>
									<div>{rating.review}</div>
								</div>
							))}
					</div>
				</>
			)}
		</div>
	);
}
