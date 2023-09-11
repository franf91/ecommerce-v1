"use client";
import Link from "next/link";
import HomeIcon from "./HomeIcon";
import User from "./User";
import AuthButton from "./AuthButton";
import Cart from "./Cart";

export default function Header() {
	return (
		<header className="header">
			<div className="header-ls">
				<Link href="/">
					<HomeIcon />
				</Link>
				<Link href="./account">
					<User />
				</Link>
			</div>
			<div className="header-rs">
				<AuthButton />

				<Link href="../../cart">
					<Cart />
				</Link>
			</div>
		</header>
	);
}
