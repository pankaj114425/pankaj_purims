import Link from "next/link";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import alpha3 from "@/utils/alpha3";
import { getDocByScopusID } from "@/utils/mongo";

export default async function DocAuthors({ params = { scopusID: "" } }) {
	let url = "/docs";
	if (params.scopusID) url += "?sid=" + params.scopusID;
	else throw "doc not found!";
	let data = await getDocByScopusID(params.scopusID);
	return (
		<>
			<AuthorList authCount={data.authorCount} data={data.authors} className="col-span-8" />
		</>
	);
}

async function AuthorList({ data, authCount, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<h2>{authCount} Authors</h2>
				<ol className={`flex flex-col`}>
					{data.map((a, i) => (
						<li className="p-2 py-4 justify-between border-b-2 first:border-t-2" key={i}>
							{a.inDB ? (
								<Link href={`/author/${a.auid}`} className="block w-full">
									<div className="text-xl text-blue-400">
										{a.surname}
										{a.surname && ", "}
										{a.givenName} {a.middleName || ""}
									</div>
								</Link>
							) : (
								<div href={`/author/${a.auid}`} className="block w-full">
									<div className="text-xl">
										{a.surname}
										{a.surname && ", "}
										{a.givenName} {a.middleName || ""}
									</div>
								</div>
							)}
							{a.affiliation[0] && (
								<div className="">
									{a.affiliation[0]?.organization?.map((o) => (
										<div>{o.$ || o}</div>
									))}
									<div>
										{a.affiliation[0].addressPart || ""}
										{a.affiliation[0].addressPart &&
											(a.affiliation[0].city || a.affiliation[0].cityGroup) &&
											", "}
										{a.affiliation[0].cityGroup || a.affiliation[0].city}
									</div>
									{a.affiliation[0].country && alpha3(a.affiliation[0].country)}
								</div>
							)}
						</li>
					))}
				</ol>
			</CardContent>
		</Card>
	);
}
