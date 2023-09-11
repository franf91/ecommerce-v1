"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function Page() {
	const { data: session } = useSession();
	const router = useRouter();

	const [items, setItems] = useState([]);

	const [userId, setUserId] = useState(null);

	useEffect(() => {
		if (session) {
			setUserId({ id: session.user.id });
		} else {
			router.push("./login");
		}
	}, [session]);

	useEffect(() => {
		if (userId) {
			getOrders();
		}
	}, [userId]);

	const getOrders = async () => {
		const response = await fetch("../../api/orders", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userId),
		});

		const orders = await response.json();
		setItems(orders.orders);
	};

	return (
		<div className="orders-container">
			<h3 className="orders-title">Orders</h3>
			{items.length === 0 ? (
				<div>No orders available.</div>
			) : (
				items.map((order, index) => (
					<div className="orders-container-item" key={index}>
						<div className="orders-date">Date: {order.date}</div>
						<div>
							{order.order.map((item, itemIndex) => (
								<div className="orders-product-info" key={itemIndex}>
									<div className="orders-img">
										{" "}
										<img
											src={`../../img/${item.category}/${item.img}`}
											alt={item.name}
										/>
									</div>

									<div>{item.name}</div>
								</div>
							))}
						</div>
					</div>
				))
			)}
		</div>
	);
}
