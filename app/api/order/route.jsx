import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
	updateDoc,
	arrayUnion,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { userId, items } = body;

	try {
		// Get the user document
		const userRef = doc(db, "users", userId);
		const userSnapshot = await getDoc(userRef);

		if (userSnapshot.exists()) {
			const userData = userSnapshot.data();

			// Format the current date
			const formattedDate = new Intl.DateTimeFormat("en-US", {
				year: "numeric",
				month: "long",
				day: "numeric",
			}).format(new Date());

			// Extract relevant information from items array
			const orderItems = items.map((item) => ({
				img: item.img,
				name: item.name,
				productId: item.productId,
				category: item.category,
			}));

			// Construct the order object
			const orderObject = {
				date: formattedDate,
				order: orderItems,
			};

			// Update the user's orders and cart arrays
			await updateDoc(userRef, {
				orders: arrayUnion(orderObject),
				cart: [], // Clear the cart by setting it to an empty array
				cartPriceTotal: 0,
			});

			return NextResponse.json({ success: true });
		} else {
			return NextResponse.json({ success: false, message: "User not found" });
		}
	} catch (error) {
		console.error("Error placing order:", error);
		return NextResponse.json({
			success: false,
			message: "Error placing order",
		});
	}
}
