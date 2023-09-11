"use client";
import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";
import { usePathname } from "next/navigation";
import Link from "next/link";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function Page() {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const parts = pathname.split("/");
	const category = parts[1];
	const productID = parts[2];

	const [itemID, setItemID] = useState({
		id: productID,
	});

	const [userID, setUserID] = useState(null);

	useEffect(() => {
		if (session) {
			setUserID({ id: session.user.id });
		} else {
			router.push("../../login");
		}
	}, [session]);

	const [item, setItem] = useState([]);

	useEffect(() => {
		getItem();
	}, [itemID]);

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

	return (
		<div>
			<div className="added-item-container">
				<div className="added-item-alert">
					<Alert variant="outlined" severity="success">
						Your order is submitted.
					</Alert>
				</div>

				<div className="added-item-button-container">
					<div className="added-item-button">
						<Link href="./">
							<button className="continueshopping-button ">
								Continue Shopping
							</button>
						</Link>
					</div>
					<div className="added-item-button">
						<Link href="./orders">
							<button className="your-order">Your Orders</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
