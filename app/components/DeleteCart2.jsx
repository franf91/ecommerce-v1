"use client";
import React, { useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { CartContext } from "../context/CartContext";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

export default function DeleteCart(props) {
	const { data: session } = useSession();

	const router = useRouter();

	const handleDeleteFromCart = async () => {
		if (session && session.user) {
			const userId = session.user.id;

			const response = await fetch("../../api/deleteCart2", {
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
			props.getCartItems();
		} else {
			router.push("../../login");
		}
	};

	return (
		<button onClick={handleDeleteFromCart}>
			<RemoveCircleOutlinedIcon />
		</button>
	);
}
