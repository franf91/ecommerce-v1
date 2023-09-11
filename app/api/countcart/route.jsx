import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";

export async function POST(request) {
	const body = await request.json();
	const { userId } = body;

	const docRef = doc(collection(db, "users"), userId);
	const docSnapshot = await getDoc(docRef);

	if (docSnapshot.exists()) {
		const docData = docSnapshot.data();
		const cartLength = docData.cart.length;
		return NextResponse.json({ cartLength });
	}

	return NextResponse.json({ cartLength: 0 });
}
