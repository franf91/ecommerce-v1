import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { title } = body;

	// Create a Firestore query to filter products by category
	const productsRef = collection(db, "products");
	const q = query(productsRef, where("category", "==", title));

	// Retrieve the filtered products
	const querySnapshot = await getDocs(q);
	const products = [];
	querySnapshot.forEach((doc) => {
		// Get the data of each product
		const productData = doc.data();
		// Add the document ID to the product data
		productData.id = doc.id;
		// Add the product to the array
		products.push(productData);
	});

	return NextResponse.json({ products });
}
