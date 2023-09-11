import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { NextResponse } from "next/server";
import { capitalize } from "lodash";

export async function POST(request) {
	const body = await request.json();
	const { fName, lName, email, password, passwordAgain } = body;

	let resFName = false;
	let resLName = false;
	let resEmail = false;
	let resPassword = false;
	let resPasswordAgain = false;
	let resEmailExists = false;

	if (!fName) {
		resFName = true;
	}

	if (!lName) {
		resLName = true;
	}
	if (!email) {
		resEmail = true;
	}
	if (!password) {
		resPassword = true;
	}
	if (!passwordAgain || passwordAgain != password) {
		resPasswordAgain = true;
	}

	if (!fName || !lName || !email || !password || !passwordAgain) {
		return NextResponse.json({
			resFName: resFName,
			resLName: resLName,
			resEmail: resEmail,
			resPassword: resPassword,
			resPasswordAgain: resPasswordAgain,
		});
	}

	async function isEmailExists(email) {
		const q = query(collection(db, "users"), where("email", "==", email));
		const querySnapshot = await getDocs(q);

		return !querySnapshot.empty;
	}

	const emailExists = await isEmailExists(email.trim());

	if (emailExists) {
		resEmailExists = true;
		return NextResponse.json({
			resFName: resFName,
			resLName: resLName,
			resEmail: resEmail,
			resPassword: resPassword,
			resEmailExists: resEmailExists,
			resPasswordAgain: resPasswordAgain,
		});
	}

	const hashedPassword = await bcrypt.hash(password.trim(), 10);
	await addDoc(collection(db, "users"), {
		fName: capitalize(fName),
		lName: capitalize(lName),
		email: email.trim(),
		password: hashedPassword,
		cart: [],
		cartPriceTotal: 0,
		orders: [],
	});

	return NextResponse.json({
		resFName: resFName,
		resLName: resLName,
		resEmail: resEmail,
		resPassword: resPassword,
		resEmailExists: resEmailExists,
		resPasswordAgain: resPasswordAgain,
	});
}
