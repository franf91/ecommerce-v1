"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { toast } from "react-hot-toast";

export default function AuthButton() {
	const { data: session } = useSession();
	const router = useRouter();

	const handleToggleAuth = () => {
		if (session?.user) {
			signOut();
			toast.success("Logged out successfully");
		} else {
			router.push("./login");
		}
	};

	return (
		<button onClick={handleToggleAuth}>
			<div className="header-item">
				<AccountCircleOutlinedIcon sx={{ width: 32, height: 32 }} />
				<span className="header-label">
					{session?.user ? "Sign Out" : "Sign In"}
				</span>
			</div>
		</button>
	);
}
