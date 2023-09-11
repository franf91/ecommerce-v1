import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../lib/firebase";

async function getUserByEmail(email) {
	const q = query(collection(db, "users"), where("email", "==", email));
	const querySnapshot = await getDocs(q);

	if (!querySnapshot.empty) {
		const docSnapshot = querySnapshot.docs[0];
		const docData = docSnapshot.data();

		return {
			fName: docData.fName,
			email: docData.email,
			id: docSnapshot.id,
			password: docData.password,
		};
	}

	return null;
}

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "text", placeholder: "jsmith" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				if (!credentials.email && !credentials.password) {
					throw new Error("Email Password Empty");
				} else if (!credentials.email) {
					throw new Error("Email Empty");
				} else if (!credentials.password) {
					throw new Error("Password Empty");
				}

				const user = await getUserByEmail(credentials.email.trim());

				if (!user) {
					throw new Error("No user found");
				}

				const passwordMatch = await bcrypt.compare(
					credentials.password.trim(),
					user.password
				);

				if (!passwordMatch) {
					throw new Error("Invalid password");
				}

				return user;
			},
		}),
	],
	secret: process.env.SECRET_KEY,
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async session({ session, token, callback }) {
			if (callback?.error) {
				return null;
			}
			session.user.id = token.id;
			session.user.fName = token.fName;
			return session;
		},
		async jwt({ token, account, user, callback }) {
			if (callback?.error) {
				return null;
			}
			if (account) {
				token.accessToken = account.access_token;
				token.id = user.id;
				token.fName = user.fName;
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
