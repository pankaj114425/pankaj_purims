import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";
import Chip from "./UI/Chip";
import Icon from "@/icons/Icon";
import OpenInNewIcon from "@/icons/OpenInNewIcon";
import DocChips from "./docChips";
import Button from "./UI/Button";

export default async function DocumentList({
	data,
	page = 1,
	pageSize = 25,
	fixedHeight = false,
	viewAll = false,
	viewAllLink = "",
	total = null,
	...props
}) {
	let docsCount = data.count;
	return (
		<div {...props}>
			<div>
				<CardContent>
					<h2 className="pb-1">
						Viewing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, docsCount)} Documents
					</h2>
					{
						total && <span>{total} Documents found</span>
					}
				</CardContent>
			</div>

			{data.results.map((doc, i) => (
				<Card className="my-5">
					<CardContent className="flex flex-row p-2 py-4" key={i}>
						<div className="flex-1">
							<Link
								className="doc-link pr-8 flex flex-col items-start"
								href={`/document/${doc.scopusID}/`}
							>
								<div className="text-sm">
									{doc.source.subType}
									{doc.openAccess && " • Open Access"}
									{doc.hasFundingInfo && " • Funded"}
								</div>
								<div className="doc-title text-xl serif">{doc.title}</div>
								<div className="text-base">{doc.source.publicationName}</div>
								<div>{doc.coverDate && dateFormatter.format(new Date(doc.coverDate))}</div>
							</Link>
							<DocChips data={doc} className="flex flex-wrap flex-row gap-2 mt-2" />
						</div>
						<div className="pr-3">
							<div className="text-base pl-2 mb-2 border-l-4 border-blue-600">Citations</div>
							<div className="text-xl pl-2 mb-2 border-l-4 border-blue-600">
								{doc.citedByCount}
								<div className="text-sm">Scopus</div>
							</div>
							<div className="text-xl pl-2 border-l-4 border-blue-600">
								{doc.crossref?.citedByCount || 0}
								<div className="text-sm">Crossref</div>
							</div>
						</div>
					</CardContent>
				</Card>
			))}
			{viewAll && (
				<div className="text-center">
					<Button variant="filled" component={Link} href={viewAllLink}>
						View All Documents
					</Button>
				</div>
			)}
		</div>
	);
}

let dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" });
