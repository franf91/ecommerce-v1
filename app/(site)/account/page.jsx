import InventoryIcon from "@mui/icons-material/Inventory";
import Link from "next/link";
export default function Page() {
	return (
		<div className="account-container">
			<h3 className="account-title">Account</h3>
			<Link href="./orders">
				<div className="account-item">
					<div>
						<InventoryIcon style={{ fontSize: 60 }} />
					</div>
					<div className="account-item-title">Your orders</div>
				</div>
			</Link>
		</div>
	);
}
