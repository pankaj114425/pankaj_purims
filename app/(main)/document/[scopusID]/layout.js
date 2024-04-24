import ActiveLinkChip from "@/components/UI/ActiveLinkChip";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import DocChips from "@/components/docChips";
import CrossRefIcon from "@/icons/Crossref";
import ScopusIcon from "@/icons/Scopus";
import alpha3 from "@/utils/alpha3";
import { getDocByScopusID, getSource } from "@/utils/mongo";
import Link from "next/link";

export default async function DocumentLayout({ children, params = { scopusID: null } }) {
	let url = "/doc";
	if (params.scopusID) url += "/" + params.scopusID;
	else throw "doc not found!";
	let data = await getDocByScopusID(params.scopusID);
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 flex flex-row gap-4">
				<ActiveLinkChip slug={null} href={`/document/${params.scopusID}/`}>
					Overview
				</ActiveLinkChip>
				<ActiveLinkChip slug={"authors"} href={`/document/${params.scopusID}/authors`}>
					Authors
				</ActiveLinkChip>
				<ActiveLinkChip slug={"references"} href={`/document/${params.scopusID}/references`}>
					References
				</ActiveLinkChip>
				{/* <ActiveLinkChip slug={"cited-by"} href={`/document/${params.scopusID}/cited-by`}>
					Cited By
				</ActiveLinkChip> */}
			</div>
			<Document data={data} className="col-span-12 self-stretch" />
			<Sidebar data={data} className="col-span-4 row-span-2" />
			<div className="col-span-8 flex flex-col gap-4">{children}</div>
		</main>
	);
}

function ConferenceInfo({ conf, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<div className="text-base">Presented in</div>
				<div className="text-2xl pb-2">{conf.confName || conf.confSeriesTitle}</div>
				<div>
					{conf.confLocation && (
						<div className="py-2 border-divider">
							{conf.confLocation.venue && <div>{conf.confLocation.venue}</div>}
							{(conf.confLocation["address-part"] || conf.confLocation.city) && (
								<div>
									{conf.confLocation["address-part"] || ""}
									{conf.confLocation["address-part"] && conf.confLocation.city && ", "}
									{conf.confLocation.city || ""}
								</div>
							)}
							{conf.confLocation["@country"] && <div>{alpha3(conf.confLocation["@country"])}</div>}
						</div>
					)}
				</div>
			</CardContent>
		</Card>
	);
}

async function Sidebar({ data, ...props }) {
	let sourceData = await getSource(data.source.sourceID);
	return (
		<div {...props}>
			{data.conference && <ConferenceInfo conf={data.conference} className="mb-4" />}
			<Card className="mb-4">
				<CardContent>
					<div className="text-base">Published in</div>
					<div className="text-2xl pb-2">{data.source.publicationName}</div>
					{!sourceData.error && (
						<div>
							{sourceData.impactFactorData?.metrics?.impactMetrics?.jif && (
								<div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
									<div className="flex-1">Impact Factor</div>
									<div className="px-2">{sourceData.impactFactorData?.metrics?.impactMetrics?.jif}</div>
								</div>
							)}
							{sourceData.citeScore && (
								<div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
									<div className="flex-1">CiteScore</div>
									<div className="px-2">{sourceData.citeScore.currentMetric}</div>
								</div>
							)}
							{sourceData.snip && (
								<div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
									<div className="flex-1">SNIP</div>
									<div className="px-2">{sourceData.snip.value}</div>
								</div>
							)}
							{sourceData.sjr && (
								<div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
									<div className="flex-1">SJR</div>
									<div className="px-2">{sourceData.sjr.value}</div>
								</div>
							)}
						</div>
					)}
				</CardContent>
			</Card>
			<Card className="mb-4">
				<CardContent>
					<div className="flex flex-row items-start justify-between mb-0">
						<div>
							<div className="text-lg font-semibold">Citations</div>
							<div className="text-5xl font-mono font-bold">{data.citedByCount}</div>
						</div>
						<div className={"rounded-lg p-2 my-2 big-icon "}>
							<ScopusIcon width={128} height={48} />
						</div>
					</div>
				</CardContent>
			</Card>
			{data.crossref && (
				<Card className="mb-4">
					<CardContent>
						<div className="flex flex-row items-start justify-between mb-0">
							<div>
								<div className="text-lg font-semibold">Citations</div>
								<div className="text-5xl font-mono font-bold">{data.crossref.citedByCount}</div>
							</div>
							<div className={"rounded-lg p-2 my-2 big-icon "}>
								<CrossRefIcon width={128} height={48} />
							</div>
						</div>
					</CardContent>
				</Card>
			)}

			{data.crossref && data.crossref.funder && (
				<Card className="mb-4">
					<CardContent>
						<h3>Funders:</h3>
						{data.crossref.funder.map((f) => (
							<div className="text-lg py-2 border-divider">
								{f.name}
								{f.award && (
									<ul className="text-base list-disc pl-6">
										{f.award.map((a) => (
											<li>{a}</li>
										))}
									</ul>
								)}
							</div>
						))}
					</CardContent>
				</Card>
			)}
			{data.hasFundingInfo && data.fundingText && (
				<Card>
					<CardContent>
						<h3>Funding Text:</h3>
						<div>
							{typeof data.fundingText === "string" ? (
								<div className="text-base border-divider py-2">{data.fundingText}</div>
							) : (
								data.fundingText.map((f) => <div className="text-base border-divider">{f.$}</div>)
							)}
						</div>
					</CardContent>
				</Card>
			)}
		</div>
	);
}

function Document({ data, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<div className="text-sm">
					{data.source.subType}
					{data.openAccess && " • Open Access"}
					{data.hasFundingInfo && " • Funded"}
				</div>
				<h1 className="text-3xl serif ">{data.title}</h1>
				<div>
					{data.authors.slice(0, 7).map((au) =>
						au.inDB ? (
							<Link href={`/author/${au.auid}`} className="author-link pr-2">
								{au.surname}
								{au.surname && au.givenName && ", "}
								{au.givenName}
								{au.isCorresponding && "(Corresponding)"};
							</Link>
						) : (
							<span className="pr-2">
								{au.surname}
								{au.surname && au.givenName && ", "}
								{au.givenName}
								{au.isCorresponding && "(Corresponding)"};
							</span>
						)
					)}{data.authors.length > 7 && ` +${data.authors.length - 7} more`}
				</div>
				<div>
					{data.source.publicationName}
					<span className="text-secondary">
						{data.source.volume && `, Volume ${data.source.volume}`}
						{data.source.pageRange && `, Pages ${data.source.pageRange}`}
					</span>
				</div>
				<div>{data.coverDate && dateFormatter.format(new Date(data.coverDate))}</div>
				<DocChips data={data} className="mt-2 flex flex-row gap-4" />
			</CardContent>
		</Card>
	);
}

let dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" });
