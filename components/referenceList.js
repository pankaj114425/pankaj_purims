import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";
import DocChips from "./docChips";
import Button from "./UI/Button";

export default async function ReferenceList({
	data,
	page = 1,
	pageSize = 25,
	fixedHeight = false,
	viewAll = false,
	viewAllLink = "",
	...props
}) {
	let refsCount = data.refCount;
	return (
		<Card {...props}>
			<CardContent>
				<h2>{refsCount || 0} References</h2>
				<ol className={`flex flex-col ${fixedHeight && "max-h-450 overflow-y-scroll"}`}>
					{data.reference?.length > 0 &&
						data.reference.map((ref, i) => (
							<li className="border-divider py-2" key={i}>
								{ref.inDB ? (
									<Link
										href={`/document/${ref.scopusID}/`}
										className="block text-lg font-serif break-words link"
									>
										{ref.text}
									</Link>
								) : (
									<div className="text-lg font-serif break-words">{ref.text}</div>
								)}
								<DocChips data={ref} className="flex flex-row gap-2 my-1" />
							</li>
						))}
					{viewAll && (
						<li className="border-divider py-4 text-center">
							<Button variant="filled" component={Link} href={viewAllLink}>
								View All {refsCount} References
							</Button>
						</li>
					)}
				</ol>
			</CardContent>
		</Card>
	);
}
