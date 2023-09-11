"use client";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";

export default function AddCart(props) {
	const { data: session } = useSession();
	const { setCartCount } = useContext(CartContext);
	const router = useRouter();

	const handleAddToCart = async () => {
		if (session && session.user) {
			const userId = session.user.id;

			const response = await fetch("../../api/addcart", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userId,
					itemId: props.itemId,
					itemPrice: props.itemPrice,
				}),
			});

			const { cartLength } = await response.json();
			setCartCount(cartLength);
		} else {
			router.push("../../login");
		}
	};

	return (
		<button className="product-button" onClick={handleAddToCart}>
			Add To Cart
		</button>
	);
}
