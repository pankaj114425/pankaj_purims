import Link from "next/link";
import CardContent from "./UI/CardContent";

export default function Footer() {
	return (
		<div component="footer" className="w-full mt-10 paper text-sm">
			<CardContent className="flex flex-row justify-between items-center">
				<span>Developed by MAIVRIK Lab</span>
				<div>
					<Link className="mr-6" href={"/about"}>
						About
					</Link>
					<Link href={"/contact"}>
						Contact Us
					</Link>
				</div>
			</CardContent>
		</div>
	);
}
