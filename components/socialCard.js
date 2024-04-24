import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import XIcon from "@/icons/X";
import Link from "next/link";

export default function SocialCard({ Icon = XIcon, stat, statTitle, statDesc = "", className = "",margin="" }) {
	return (
		<div className={"relative hoverSlide " + className}>
			<Card className="relative h-full">
				<CardContent className="flex flex-col justify-center">
					<div className="flex flex-row items-start justify-between">
						<div>
							<div className="text-lg font-semibold">{statTitle}</div>
							<div className="text-4xl font-mono font-bold">{stat}</div>
							<div className={"text-sm " + margin}>{statDesc}</div>
						</div>
						<div className={"rounded-lg p-2 my-2 "}>
							{Icon}
						</div>
						
					</div>
					
				</CardContent>
			</Card>
		</div>
	);
}