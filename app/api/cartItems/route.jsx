import {
	collection,
	getDocs,
	query,
	where,
	doc,
	getDoc,
} from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { id } = body;
	let result = [];

	// Get user's cart
	const userRef = doc(db, "users", id);
	const userSnap = await getDoc(userRef);
	const user = userSnap.data();

	// Loop over the products in the cart
	for (const product of user.cart) {
		// Get product details
		const productRef = doc(db, "products", product.id);
		const productSnap = await getDoc(productRef);

		// Append the count to the product object
		let productData = productSnap.data();
		productData.count = product.count;
		productData.productId = productSnap.id;

		// Push the product data into the result array
		result.push(productData);
	}

	return NextResponse.json({ result, cartPriceTotal: user.cartPriceTotal });
}
