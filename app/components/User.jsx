"use client";
import { useSession } from "next-auth/react";
import Avatar from "@mui/material/Avatar";

export default function User() {
	const { data: session } = useSession();

	if (session && session.user) {
		return (
			<div className="header-item">
				<Avatar
					sx={{
						width: 32,
						height: 32,
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						fontSize: "18px",
					}}
				>
					{session.user.fName.charAt(0)}
				</Avatar>

				<span className="header-label">Hi,{session.user.fName}</span>
			</div>
		);
	}

	return null;
}
