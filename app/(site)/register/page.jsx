"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";

export default function Page() {
	const session = useSession();
	const router = useRouter();

	const [showFirstNameError, setShowFirstNameError] = useState(false);
	const [showLastNameError, setShowLastNameError] = useState(false);
	const [showEmailError, setShowEmailError] = useState(false);
	const [showPasswordError, setShowPasswordError] = useState(false);
	const [showPasswordAgainError, setShowPasswordAgainError] = useState(false);
	const [showUserError, setShowUserError] = useState(false);

	const firstNameInputRef = useRef(null);
	const lastNameInputRef = useRef(null);
	const emailInputRef = useRef(null);
	const passwordInputRef = useRef(null);
	const passwordAgainInputRef = useRef(null);

	const [user, setUser] = useState({
		fName: "",
		lName: "",
		email: "",
		password: "",
		passwordAgain: "",
	});

	useEffect(() => {
		if (session.status === "authenticated") {
			router.push("../../");
		}
	});

	const registerUser = async (e) => {
		e.preventDefault();

		const response = await fetch("../../api/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(user),
		});

		const error = await response.json();

		setShowFirstNameError(false);
		setShowLastNameError(false);
		setShowEmailError(false);
		setShowPasswordError(false);
		setShowUserError(false);
		setShowPasswordAgainError(false);

		if (error.resPasswordAgain) {
			setShowPasswordAgainError(true);
			setUser({ ...user, passwordAgain: "" });
			passwordAgainInputRef.current.focus();
		}
		if (error.resPassword) {
			setShowPasswordError(true);
			setUser({ ...user, password: "" });
			passwordAgainInputRef.current.blur();
			passwordInputRef.current.focus();
		}
		if (error.resEmail) {
			setShowEmailError(true);
			setUser({ ...user, email: "" });
			passwordInputRef.current.blur();
			emailInputRef.current.focus();
		}
		if (error.resLName) {
			setShowLastNameError(true);
			setUser({ ...user, lName: "" });
			emailInputRef.current.blur();
			lastNameInputRef.current.focus();
		}
		if (error.resFName) {
			setShowFirstNameError(true);
			setUser({ ...user, fName: "" });
			lastNameInputRef.current.blur();
			firstNameInputRef.current.focus();
		}

		if (
			!error.resFName &&
			!error.resLName &&
			!error.resEmail &&
			!error.resPassword &&
			user.password != user.passwordAgain
		) {
			setShowPasswordError(true);
			passwordAgainInputRef.current.blur();
			passwordInputRef.current.focus();
		} else if (
			!error.resFName &&
			!error.resLName &&
			!error.resEmail &&
			!error.resPassword &&
			!error.resPasswordAgain &&
			error.resEmailExists
		) {
			setShowUserError(true);
		} else if (
			!error.resFName &&
			!error.resLName &&
			!error.resEmail &&
			!error.resPassword &&
			!error.resPasswordAgain &&
			!error.resEmailExists
		) {
			setUser({
				fName: "",
				lName: "",
				email: "",
				password: "",
				passwordAgain: "",
			});

			toast.success("New user registered successfully");

			router.push("./login");
		}
	};

	const handleFirstNameInput = (e) => {
		setUser({ ...user, fName: e.target.value });
		setShowFirstNameError(false);
	};
	const handleLastNameInput = (e) => {
		setUser({ ...user, lName: e.target.value });
		setShowLastNameError(false);
	};

	const handleEmailInput = (e) => {
		setUser({ ...user, email: e.target.value });
		setShowEmailError(false);
	};
	const handlePasswordInput = (e) => {
		setUser({ ...user, password: e.target.value });
		setShowPasswordError(false);
	};
	const handlePasswordAgainInput = (e) => {
		setUser({ ...user, passwordAgain: e.target.value });
		setShowPasswordAgainError(false);
	};

	return (
		<div className="main-container">
			<div className="auth-main-container">
				<form onSubmit={registerUser}>
					{showUserError && (
						<Alert
							severity="error"
							sx={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px",
							}}
						>
							Sorry,the email you entered is already registered. Please enter a
							different email.
						</Alert>
					)}
					<h2>Register</h2>
					<label className="auth-label">First name</label>
					<br />
					<input
						className={` ${
							showFirstNameError ? "auth-input-error" : "auth-input"
						}`}
						type="text"
						value={user.fName}
						onChange={handleFirstNameInput}
						ref={firstNameInputRef}
					></input>
					<br />
					{showFirstNameError && (
						<Alert
							severity="error"
							sx={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px",
							}}
						>
							Please enter a valid first name.
						</Alert>
					)}
					<label className="auth-label">Last name</label>
					<br />
					<input
						className={` ${
							showLastNameError ? "auth-input-error" : "auth-input"
						}`}
						type="text"
						value={user.lName}
						onChange={handleLastNameInput}
						ref={lastNameInputRef}
					></input>
					<br />
					{showLastNameError && (
						<Alert
							severity="error"
							sx={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px",
							}}
						>
							Please enter a valid last name.
						</Alert>
					)}
					<label className="auth-label">Email</label>
					<br />
					<input
						className={` ${showEmailError ? "auth-input-error" : "auth-input"}`}
						type="email"
						value={user.email}
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
						value={user.password}
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
					<label className="auth-label">Password again</label>
					<br />
					<input
						className={` ${
							showPasswordAgainError ? "auth-input-error" : "auth-input"
						}`}
						type="password"
						value={user.passwordAgain}
						onChange={handlePasswordAgainInput}
						ref={passwordAgainInputRef}
					></input>
					<br />
					{showPasswordAgainError && (
						<Alert
							severity="error"
							sx={{
								backgroundColor: "transparent",
								border: "none",
								padding: "0px",
							}}
						>
							Passwords do not match.
						</Alert>
					)}
					<button className="auth-button" type="submit">
						Register
					</button>
				</form>
			</div>
		</div>
	);
}
