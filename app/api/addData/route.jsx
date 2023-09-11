import { collection, addDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	try {
		const body = await request.json();
		const { data } = body;

		// Iterate through the data array and add each object to the "products" collection
		for (const product of data) {
			// Add a new document to the "products" collection
			await addDoc(collection(db, "products"), product);
		}

		return NextResponse.json({ success: true });
	} catch (error) {
		console.error("Error adding data to Firestore:", error);
		return NextResponse.json({ success: false, error: error.message });
	}
}
