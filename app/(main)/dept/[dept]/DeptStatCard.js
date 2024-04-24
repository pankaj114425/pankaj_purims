import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Icon from "@/icons/Icon";
import SortIcon from "@/icons/SortIcon";
import Link from "next/link";

export default function DeptStatCard({
	icon = SortIcon,
	stat,
	statTitle,
	rank,
	className = "",
}) {
	let th = getSuffix(rank);
	return (
		<Card className={className}>
			<CardContent className="flex flex-col justify-center pl-6">
				<div className="flex flex-row items-center mb-2">
					<div className={"rounded-lg p-2 mr-4 big-icon"}>
						<Icon>{icon}</Icon>
					</div>
					<div>
						<div className="text-5xl font-mono font-bold">{stat}</div>
						<div className="text-xl font-semibold">{statTitle}</div>
					</div>
				</div>
				<div className="text-lg">
					{th !== "" && `${rank}${th} `}Highest in Panjab University
				</div>
			</CardContent>
		</Card>
	);
}

function getSuffix(deptRank) {
	let dth = "th";
	let d = "" + deptRank;
	if (deptRank == 1) {
		dth = "";
	} else if (d[d.length - 1] == "1") {
		dth = "st";
	} else if (d[d.length - 1] == "2") {
		dth = "nd";
	} else if (d[d.length - 1] == "3") {
		dth = "rd";
	}
	return dth;
}
