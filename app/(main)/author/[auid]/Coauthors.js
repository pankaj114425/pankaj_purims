"use client";
import CoauthorMap from "@/components/CoauthorMap";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Chip from "@/components/UI/Chip";
import OpenInNewIcon from "@/icons/OpenInNewIcon";
import alpha3 from "@/utils/alpha3";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/UI/Button";
import Link from "next/link";
import DocIcon from "@/icons/docIcon";

export default function Coauthors({ baseURL, addQ = true, data, worldData, ...props }) {
	// Bye let countries = {};
	// for (let { author } of data) {
	// 	let affiliation = author["author-profile"]["affiliation-current"].affiliation;
	// 	if (affiliation.length) {
	// 		affiliation = affiliation[0];
	// 	}
	// 	if (countries[affiliation["ip-doc"].address.country]) {
	// 		countries[affiliation["ip-doc"].address.country]++;
	// 	} else {
	// 		countries[affiliation["ip-doc"].address.country] = 1;
	// 	}
	// }
	const [filter, setFilter] = useState("All");
	// const router = useRouter();
	return (
		<>
			<Card className="col-span-8 col-start-1">
				<CardContent>
					<h2>Global Collaborations</h2>
					<div style={{ height: "450px" }}>
						<CoauthorMap
							data={worldData}
							onClick={({ data }) => {
								if (data) {
									setFilter(data.id);
									// router.push(`/document/?page=1&sort=coverDate&order=descending&pub=&type=&country=${d.id || ""}`)
								}
							}}
						/>
					</div>
				</CardContent>
			</Card>
			<div className="col-span-4 grid-12">
				<Card className="col-span-12">
					<CardContent>
						<h2>
							{
								data.filter((a) =>
									filter == "All" ? true : a.countries?.includes(filter.toLowerCase())
								).length
							}{" "}
							Coauthors
						</h2>
						<div className="py-2 flex flex-row items-center justify-between border-y-2 border-slate-300">
							<div className="text-lg">Filter by Country</div>
							<select
								value={filter}
								onChange={(e) => setFilter(e.target.value)}
								className="w-40 text-ellipsis p-1 border"
							>
								<option value={"All"} selected>
									All
								</option>
								{worldData.map(({ id }) => (
									<option value={id}>{alpha3(id)}</option>
								))}
							</select>
						</div>
						<ol
							className={`flex flex-col ${filter == "All" ? "max-h-96" : "max-h-320"} overflow-y-scroll`}
						>
							{data
								.filter((a) => (filter == "All" ? true : a.countries?.includes(filter.toLowerCase())))
								.sort((a, b) => b.count - a.count)
								.map(({ count, givenName, surname, inDB = false, _id }, i) => (
									<li
										className="flex flex-row items-center p-2 justify-between border-b-2 border-slate-300"
										key={i}
									>
										<div>
											<div className="text-lg">
												{surname}
												{surname && givenName && ", "}
												{givenName}
											</div>
											<div className="flex flex-row flex-wrap w-full gap-2 py-1">
												<Chip
													component="a"
													target="_blank"
													className="scopus-chip"
													icon={<OpenInNewIcon />}
													href={`https://www.scopus.com/authid/detail.uri?authorId=${_id}`}
												>
													Scopus
												</Chip>
												{inDB && (
													<Chip
														component="a"
														target="_blank"
														className="pubmed-chip"
														icon={<OpenInNewIcon />}
														href={`/author/${_id}`}
													>
														PU RIMS
													</Chip>
												)}
												{baseURL && <Chip
													component={Link}
													className="pubmed-chip"
													icon={<DocIcon />}
													href={`${baseURL}${addQ ? "?" : "&"}page=1&sort=coverDate&order=descending&coauthor=${_id}`}
												>
													Documents
												</Chip>}
											</div>
										</div>
										<div className="text-3xl mx-3">{count}</div>
									</li>
								))}
						</ol>
					</CardContent>
				</Card>
				{filter !== "All" && (
					<Button
						className="col-span-12"
						variant="filled"
						component={Link}
						href={`${baseURL}${addQ ? "?" : "&"}page=1&sort=coverDate&order=descending&country=${filter}`}
					>
						View Documents
					</Button>
				)}
			</div>
		</>
	);
}
