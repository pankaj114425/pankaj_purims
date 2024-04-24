import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Icon from "@/icons/Icon";
import SortIcon from "@/icons/SortIcon";
import Link from "next/link";

export default function StatCard({
	icon = null,
	stat,
	statTitle,
	dept,
	deptRank,
	rank,
	className = "",
	showRankings =true,
	inLakh=""
}) {
	let dth = getSuffix(deptRank);
	let th = getSuffix(rank);
	
	
	return (
		<div className={"relative hoverSlide " + className}>
			{/* <Card className="w-full rankings absolute top-0 left-0">
				<CardContent className="flex flex-col justify-center pl-6">
					<div className="text-lg">
						<span>{deptRank}</span>
						{dth} Highest in{" "}
						<Link
							className="link"
							href={/dept/${dept}}
						>
							Department
						</Link>
					</div>
					<div className="text-lg">{th !== "" && `${rank}${th} `}Highest in Panjab University</div>
				</CardContent>
			</Card> */}
			<Card className="relative h-full">
				<CardContent className="flex flex-col justify-center">
					<div className="flex flex-row items-start justify-between mb-0">
						<div>
							<div className="text-lg font-semibold">{statTitle}</div>
							<div className="text-4xl font-mono font-bold ">{stat} <span className="text-3xl">{inLakh}</span></div>
						</div>
						<div className={"rounded-lg self-center big-icon "}>{icon}</div>
					</div>
					{showRankings && (
						<div>
							{deptRank && (
								<div className="text-sm">
									<span>{deptRank}</span>
								 {deptRank>3 ? `${dth} Highest in ${" "}` :`${dth} in ${" "}` }
									<Link className="link" href={`/dept/${dept}`}>
										Department
									</Link>
								</div>
							)}
							{rank && (
								<div className="text-sm">
									{th !== "" && `${rank}${th} `} {rank>3 ?'Highest in Panjab University' : 'in Panjab University'} 
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
}

function getSuffix(deptRank = 1) {
	let dth = "th";
	let d = "" + deptRank;
	if (deptRank == 1) {
		dth = "st";
	} else if (d > 10 && d < 20) {
		dth = "th";
	} else if (d[d.length - 1] == "1") {
		dth = "st";
	} else if (d[d.length - 1] == "2") {
		dth = "nd";
	} else if (d[d.length - 1] == "3") {
		dth = "rd";
	}
	return dth;
}