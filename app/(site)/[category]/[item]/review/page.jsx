"use client";
import React, { useState, useEffect, useRef, use } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Alert from "@mui/material/Alert";
import Rating from "@mui/material/Rating";
import { usePathname } from "next/navigation";
import Link from "next/link";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

export default function Page() {
	const { data: session } = useSession();
	const router = useRouter();
	const pathname = usePathname();
	const parts = pathname.split("/");
	const category = parts[1];
	const productID = parts[2];

	const [showTitleError, setShowTitleError] = useState(false);
	const [showNicknameError, setShowNicknameError] = useState(false);
	const [showReviewError, setShowReviewError] = useState(false);
	const [showRatingError, setShowRatingError] = useState(false);

	const titleInputRef = useRef(null);
	const nicknameInputRef = useRef(null);
	const reviewInputRef = useRef(null);

	const [itemID, setItemID] = useState({
		id: productID,
	});

	const [userID, setUserID] = useState(null);

	useEffect(() => {
		if (session) {
			setUserID({ id: session.user.id });
		} else {
			router.push("../../login");
		}
	}, [session]);

	const formattedDate = new Intl.DateTimeFormat("en-US", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(new Date());

	const [review, setReview] = useState({
		title: "",
		nickname: "",
		review: "",
		overallRating: 0,
		productID: itemID.id,
		userID: userID ? userID.id : null,
		date: formattedDate,
	});

	const [item, setItem] = useState([]);

	useEffect(() => {
		getItem();
	}, [itemID]);

	const getItem = async () => {
		const response = await fetch("../../api/getItem", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(itemID),
		});

		const { product } = await response.json();
		setItem(product);
	};

	const submitReview = async (e) => {
		e.preventDefault();

		const response = await fetch("../../api/review", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(review),
		});

		const error = await response.json();
		let success = true;

		setShowTitleError(false);
		setShowNicknameError(false);
		setShowReviewError(false);
		setShowRatingError(false);

		if (error.resReview) {
			setShowReviewError(true);
			reviewInputRef.current.focus();
			success = false;
		}

		if (error.resNickname) {
			setShowNicknameError(true);
			reviewInputRef.current.blur();
			nicknameInputRef.current.focus();
			success = false;
		}

		if (error.resTitle) {
			setShowTitleError(true);
			nicknameInputRef.current.blur();
			titleInputRef.current.focus();
			success = false;
		}

		if (error.resOverallRating) {
			setShowRatingError(true);
			success = false;
		}

		if (success) {
			toast.success("Review submitted successfully");
			router.push(`/${category}/${productID}`);
		}
	};

	const handleRatingInput = (e) => {
		const newRating = parseInt(e.target.value);
		setReview({ ...review, overallRating: newRating });
		setShowTitleError(false);
	};

	const handleTitleInput = (e) => {
		setReview({ ...review, title: e.target.value });
		setShowTitleError(false);
	};
	const handleNicknameInput = (e) => {
		setReview({ ...review, nickname: e.target.value });
		setShowNicknameError(false);
	};

	const handleReviewInput = (e) => {
		setReview({
			...review,
			review: e.target.value,
			userID: userID ? userID.id : null,
		});
		setShowReviewError(false);
	};

	return (
		<div>
			<div className="product-navigation">
				<div>
					<Link className="product-navigation-item" href="../">
						home
					</Link>
				</div>
				<div>
					<KeyboardArrowRightOutlinedIcon style={{ fontSize: "18px" }} />
				</div>
				<div>
					<Link
						className="product-navigation-item"
						href="/[category]"
						as={`/${category}`}
					>
						{category}
					</Link>
				</div>
				<div>
					<KeyboardArrowRightOutlinedIcon style={{ fontSize: "18px" }} />
				</div>
				<div>
					<Link
						className="product-navigation-item"
						href="/[category]/[item]"
						as={`/${category}/${productID}`}
					>
						product details
					</Link>
				</div>
				<div>
					<KeyboardArrowRightOutlinedIcon style={{ fontSize: "18px" }} />
				</div>
				<div>review</div>
			</div>
			<div className="review-product">
				<div className="review-product-img">
					<img src={`../../img/${item.category}/${item.img}`}></img>
				</div>
				<div className="review-product-name">{item.name}</div>
			</div>
			<div className="main-container">
				<div className="auth-main-container">
					<form onSubmit={submitReview}>
						<h2>Write Your Review</h2>
						<label className="auth-label">Overall Rating</label>
						<br />
						<Rating
							name="overall-rating"
							style={{ fontSize: "60px" }}
							value={review.overallRating}
							onChange={handleRatingInput}
						/>
						<br />
						{showRatingError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid rating.
							</Alert>
						)}
						<label className="auth-label">Review Title</label>
						<br />
						<input
							className={` ${
								showTitleError ? "auth-input-error" : "auth-input"
							}`}
							type="text"
							value={review.title}
							onChange={handleTitleInput}
							ref={titleInputRef}
						></input>
						<br />
						{showTitleError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid review title.
							</Alert>
						)}

						<label className="auth-label">Nickname</label>
						<br />
						<input
							className={` ${
								showNicknameError ? "auth-input-error" : "auth-input"
							}`}
							type="text"
							value={review.nickname}
							onChange={handleNicknameInput}
							ref={nicknameInputRef}
						></input>
						<br />
						{showNicknameError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid nickname.
							</Alert>
						)}
						<label className="auth-label">Your Review</label>
						<br />
						<textarea
							className={` ${
								showReviewError ? "auth-input-error" : "auth-input"
							}`}
							value={review.review}
							rows={5}
							cols={40}
							onChange={handleReviewInput}
							ref={reviewInputRef}
						></textarea>
						<br />
						{showReviewError && (
							<Alert
								severity="error"
								sx={{
									backgroundColor: "transparent",
									border: "none",
									padding: "0px",
								}}
							>
								Please enter a valid review.
							</Alert>
						)}
						<button className="auth-button" type="submit">
							Submit Review
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
