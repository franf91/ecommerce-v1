import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { userId, itemId, itemPrice } = body;

	const docRef = doc(collection(db, "users"), userId);
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		const docData = docSnapshot.data();
		const cart = docData.cart;

		// Check if the item already exists in the cart
		const existingItem = cart.find((item) => item.id === itemId);

		let updatedCart = [...cart];
		if (existingItem) {
			// If the item exists, increase its count

			updatedCart = cart.map((item) =>
				item.id === itemId
					? {
							...item,
							count: item.count + 1,
					  }
					: item
			);
		} else {
			// If the item does not exist, add it to the cart with count 1
			updatedCart = [...cart, { id: itemId, count: 1, itemPrice: itemPrice }];
		}

		// Calculate the new cartPriceTotal
		const cartPriceTotal = updatedCart.reduce(
			(total, item) => total + item.count * item.itemPrice,
			0
		);

		// Update the document with the updated cart array and cartPriceTotal
		await updateDoc(docRef, {
			cart: updatedCart,
			cartPriceTotal: cartPriceTotal,
		});

		const cartLength = updatedCart.length;
		return NextResponse.json({ cartLength });
	}

	return NextResponse.json({ cartLength: 0 });
}
