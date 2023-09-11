import { collection, addDoc, getDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";
import { capitalize } from "lodash";

export async function POST(request) {
	const body = await request.json();
	const { title, nickname, review, overallRating, productID, userID, date } =
		body;

	let resOverallRating = false;
	let resTitle = false;
	let resNickname = false;
	let resReview = false;

	if (!overallRating) {
		resOverallRating = true;
	}

	if (!title) {
		resTitle = true;
	}

	if (!nickname) {
		resNickname = true;
	}
	if (!review) {
		resReview = true;
	}

	if (!title || !nickname || !review) {
		return NextResponse.json({
			resOverallRating: resOverallRating,
			resTitle: resTitle,
			resNickname: resNickname,
			resReview: resReview,
		});
	}

	const reviewObj = {
		title,
		nickname,
		review,
		overallRating,
		userID,
		date,
	};

	const productDoc = doc(db, "products", productID);
	const productSnapshot = await getDoc(productDoc); // Use getDoc to retrieve the document

	if (productSnapshot.exists()) {
		const productData = productSnapshot.data();
		const updatedRatings = [...productData.ratings, reviewObj];

		// Calculate new averageRating based on updated ratings array
		const newAverageRating =
			updatedRatings.reduce((sum, rating) => sum + rating.overallRating, 0) /
			updatedRatings.length;

		await updateDoc(productDoc, {
			ratings: updatedRatings,
			averageRating: newAverageRating,
		});
	}

	return NextResponse.json({
		resOverallRating: resOverallRating,
		resTitle: resTitle,
		resNickname: resNickname,
		resReview: resReview,
	});
}
