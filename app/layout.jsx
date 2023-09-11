import { Poppins } from "next/font/google";
import Header from "./components/Header";
import "bootstrap/dist/css/bootstrap.css";
import Script from "next/script";
import "./globals.css";
import Provider from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import ToasterContext from "./context/ToasterContext";
import Navigation from "./components/Navigation";
import DropDown from "./components/DropDown";

const poppins = Poppins({
	weight: ["400", "700"],
	subsets: ["latin"],
});

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body>
				<Provider>
					<CartProvider>
						<Header />
						<Navigation />
						<DropDown />
						<main>
							<ToasterContext />
							{children}
						</main>
					</CartProvider>
				</Provider>
			</body>
			<Script
				src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"
				integrity="sha384-geWF76RCwLtnZ8qwWowPQNguL3RmwHVBC9FhGdlKrxdiJJigb/j/68SIy3Te4Bkz"
				crossorigin="anonymous"
			/>
		</html>
	);
}
