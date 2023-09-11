import { doc, getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { id } = body;

	const userRef = doc(db, "users", id.trim());

	// Retrieve the user document
	const userSnapshot = await getDoc(userRef);

	// Check if the document exists
	if (userSnapshot.exists()) {
		// Get the user data from the document
		const userData = userSnapshot.data();

		const orders = userData.orders;

		return NextResponse.json({ orders });
	} else {
		return NextResponse.json({ orders: null });
	}
}
