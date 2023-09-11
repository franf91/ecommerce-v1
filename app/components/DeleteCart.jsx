"use client";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteCart(props) {
	const { data: session } = useSession();
	const { setCartCount } = useContext(CartContext);
	const router = useRouter();

	const handleDeleteFromCart = async () => {
		if (session && session.user) {
			const userId = session.user.id;

			const response = await fetch("../../api/deleteCart", {
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
			props.getCartItems();
		} else {
			router.push("../../login");
		}
	};

	return (
		<button onClick={handleDeleteFromCart}>
			<div className="delete-cart">
				<DeleteIcon />

				<div>delete</div>
			</div>
		</button>
	);
}
