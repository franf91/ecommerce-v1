"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import DeleteCart from "@/app/components/DeleteCart";
import RemoveCircleOutlineOutlinedIcon from "@mui/icons-material/RemoveCircleOutlineOutlined";
import AddCart2 from "@/app/components/AddCart2";
import DeleteCart2 from "@/app/components/DeleteCart2";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import Link from "next/link";

export default function CartPage() {
	const { data: session } = useSession();
	const router = useRouter();

	const [items, setItems] = useState([]);

	const [userId, setUserId] = useState(null);

	const [cartPriceTotal, setCartPriceTotal] = useState(null);

	useEffect(() => {
		if (session) {
			setUserId({ id: session.user.id });
		} else {
			router.push("./login");
		}
	}, [session]);

	useEffect(() => {
		if (userId) {
			getCartItems();
		}
	}, [userId]);

	const getCartItems = async () => {
		const response = await fetch("../../api/cartItems", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userId),
		});

		const { result, cartPriceTotal } = await response.json();
		setItems(result);
		setCartPriceTotal(cartPriceTotal);
	};

	return (
		<div className="main-cart-container">
			<div className="cart-container">
				<h3 className="cart-title">Shopping Cart</h3>
				{items.length === 0 ? (
					<div className="cart-empty-container">
						<div className="cart-empty-info-container">
							<div className="cart-empty-info">Your cart is empty!</div>
							<div className="cart-empty-info">Why not add something?</div>
						</div>

						<div className="cart-empty-icon-container">
							<div className="cart-empty-icon">
								<ProductionQuantityLimitsIcon style={{ fontSize: "100px" }} />
							</div>
						</div>
					</div>
				) : (
					<>
						{items.map((item, index) => (
							<div key={index}>
								<hr />
								<div className="cart-item-container">
									<div className="cart-img">
										<img
											src={`../../img/${item.category}/${item.img}`}
											alt={item.name}
										/>
									</div>
									<div className="cart-item-info">
										<p>{item.name}</p>
										<p>${item.price}</p>
										<div className="cart-action-container">
											<div className="cart-item-action">
												{item.count === 1 ? (
													<RemoveCircleOutlineOutlinedIcon />
												) : (
													<DeleteCart2
														itemId={item.productId}
														getCartItems={getCartItems}
													/>
												)}
												<div>{item.count}</div>
												<AddCart2
													itemId={item.productId}
													getCartItems={getCartItems}
												/>
											</div>
											<div>
												<DeleteCart
													itemId={item.productId}
													getCartItems={getCartItems}
												/>
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
						<hr />
						<div className="priceTotal">
							<div>Product Total</div>
							<div>
								${cartPriceTotal !== null ? cartPriceTotal.toFixed(2) : 0}
							</div>
						</div>
					</>
				)}
			</div>
			<div
				className="cart-order-container"
				style={{ display: items.length === 0 ? "none" : "block" }}
			>
				<h3 className="cart-title">Order Summary</h3>
				<div className="cart-order-item ">
					<div>Product SubTotal</div>
					<div>${cartPriceTotal !== null ? cartPriceTotal.toFixed(2) : 0}</div>
				</div>
				<div className="cart-order-item ">
					<div>Estimated Taxes</div>
					<div>${(cartPriceTotal * 0.15).toFixed(2)}</div>
				</div>
				<hr />
				<div className="cart-order-item">
					<div>Estimated Total</div>
					<div>${(cartPriceTotal + cartPriceTotal * 0.15).toFixed(2)}</div>
				</div>
				<hr />
				<div>
					<Link href="./checkout">
						<button className="checkout-button">Continue To Checkout</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
