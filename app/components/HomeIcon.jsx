"use client";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

export default function HomeIcon() {
	return (
		<div className="header-item">
			<HomeOutlinedIcon sx={{ width: 32, height: 32 }} />
			<span className="header-label">Home</span>
		</div>
	);
}
