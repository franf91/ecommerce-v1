import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { userId, itemId } = body;

	const docRef = doc(collection(db, "users"), userId);
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		const docData = docSnapshot.data();
		const cart = docData.cart;

		// Create a new array without the item to delete
		let updatedCart = cart.filter((item) => item.id !== itemId);

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
