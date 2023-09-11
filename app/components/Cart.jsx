"use client";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useSession } from "next-auth/react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Badge } from "@mui/material";

export default function Cart() {
	const { data: session } = useSession();
	const { cartCount, setCartCount } = useContext(CartContext);

	useEffect(() => {
		async function fetchCartCount() {
			if (session && session.user) {
				const userId = session.user.id;

				const response = await fetch("../../api/countcart", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ userId }),
				});

				const { cartLength } = await response.json();
				setCartCount(cartLength);
			}
		}

		fetchCartCount();
	}, [session, setCartCount]);

	return (
		<div className="header-item">
			<Badge badgeContent={cartCount} color="warning">
				<ShoppingCartOutlinedIcon sx={{ width: 32, height: 32 }} />
			</Badge>
			<span className="header-label">Cart</span>
		</div>
	);
}
