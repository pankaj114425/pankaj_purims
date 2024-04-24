import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";

export default async function AuthorList({
	data,
	authCount,
	page = 1,
	pageSize = 25,
	fixedHeight = false,
	viewAll = false,
	viewAllLink = "",
	linkSuffix = "",
	...props
}) {
	return (
		<Card {...props}>
			<CardContent>
				<h2>
					Viewing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, authCount)} Authors
				</h2>
				<ol className={`flex flex-col ${fixedHeight && "max-h-450 overflow-y-scroll"}`}>
					{data.map((a, i) => (
						<li
							className="flex flex-row items-center p-2 py-4 justify-between border-b first:border-t"
							key={i}
						>
							<Link href={`/author/${a.scopusID}/${linkSuffix}`} className="block w-full">
								<div className="text-xl">
									{a.profile.lastName}
									{a.profile.lastName && ", "}
									{a.profile.firstName} {a.profile.middleName || ""}
								</div>
								<div className="flex flex-row w-full items-center justify-between mt-2 pr-3">
									<div className="text-2xl pl-2 border-l-4 border-blue-600">
										{a.citationCount}
										<div className="text-sm">Citations</div>
									</div>
									<div className="text-2xl pl-2 border-l-4 border-blue-600">
										{a.docCount}
										<div className="text-sm">Documents</div>
									</div>
									<div className="text-2xl pl-2 border-l-4 border-blue-600">
										{a.hIndex}
										<div className="text-sm">H-Index</div>
									</div>
									<div className="text-2xl pl-2 border-l-4 border-blue-600">
										{a.i10Index}
										<div className="text-sm">I-10 Index</div>
									</div>
								</div>
							</Link>
						</li>
					))}
					{viewAll && (
						<li className="border-b-2 border-slate-300 flex flex-col items-stretch justify-stretch w-full">
							<Link href={viewAllLink} className="block p-4 text-center text-lg text-blue-300">
								View All {authCount} Authors
							</Link>
						</li>
					)}
				</ol>
			</CardContent>
		</Card>
	);
}
