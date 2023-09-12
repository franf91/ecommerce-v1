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

	
// Check if 'id' is defined and is a string before trimming
const trimmedId = typeof id === 'string' ? id.trim() : id;

	const productRef = doc(db, "products", trimmedId);

	// Retrieve the product document
	const docSnapshot = await getDoc(productRef);

	// Check if the document exists
	if (docSnapshot.exists()) {
		// Get the product data from the document
		const product = docSnapshot.data();

		return NextResponse.json({ product });
	} else {
		return NextResponse.json({ product: null });
	}
}
