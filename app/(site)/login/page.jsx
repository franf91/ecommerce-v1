"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

export default function Page() {
	const session = useSession();
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const [showEmailError, setShowEmailError] = useState(false);
	const [showPasswordError, setShowPasswordError] = useState(false);
	const [showUserError, setShowUserError] = useState(false);

	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("../../");
		}
	});

	const loginUser = async (e) => {
		e.preventDefault();
		signIn("credentials", {
			email: email,
			password: password,
			redirect: false,
		}).then((callback) => {
			if (callback.error === "Email Password Empty") {
				setShowEmailError(true);
				setShowPasswordError(true);
				setShowUserError(false);
				emailInputRef.current.focus();
			} else if (callback.error === "Email Empty") {
				setShowEmailError(true);
				setShowPasswordError(false);
				setShowUserError(false);
				emailInputRef.current.focus();
			} else if (callback.error === "Password Empty") {
				setShowEmailError(false);
				setShowPasswordError(true);
				setShowUserError(false);
				passwordInputRef.current.focus();
			} else if (
				callback.error === "No user found" ||
				callback.error === "Invalid password"
			) {
				setShowEmailError(false);
				setShowPasswordError(false);
				setShowUserError(true);
			}

			if (callback.ok && !callback.error) {
				toast.success("Logged in successfully");
				setEmail("");
				setPassword("");
				router.push("../../");
			}
		});
	};

	const handleEmailInput = (e) => {
		setEmail(e.target.value);
		setShowEmailError(false); // Set showEmailError to false on input change
	};

	const handlePasswordInput = (e) => {
		setPassword(e.target.value);
		setShowPasswordError(false); // Set showPasswordError to false on input change
	};

	return (
		<div className="main-container">
			<div>
				<div className="auth-main-container">
					{showUserError && (
						<Alert
							severity="error"
							sx={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px",
							}}
						>
							Sorry,the email and password you entered don't match. Please try
							again.
						</Alert>
					)}

					<h2>Sign In</h2>
					<form onSubmit={loginUser}>
						<label className="auth-label">Email</label>
						<br />
						<input
							className={` ${
								showEmailError ? "auth-input-error" : "auth-input"
							}`}
							type="email"
							value={email}
							onChange={handleEmailInput}
							ref={emailInputRef}
						></input>

						<br />
						{showEmailError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid email.
							</Alert>
						)}

						<label className="auth-label">Password</label>
						<br />
						<input
							className={` ${
								showPasswordError ? "auth-input-error" : "auth-input"
							}`}
							type="password"
							value={password}
							onChange={handlePasswordInput}
							ref={passwordInputRef}
						></input>
						<br />
						{showPasswordError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid password.
							</Alert>
						)}

						<button className="auth-button" type="submit">
							Sign In
						</button>
						<br />
					</form>
				</div>
				<div className="new-separator">
					<span className="new-separator-line"></span>
					<span className="new-separator-content">New User?</span>
					<span className="new-separator-line"></span>
				</div>
				<Link href="./register">
					<div className="auth-secondary-container">Register</div>
				</Link>
			</div>
		</div>
	);
}
