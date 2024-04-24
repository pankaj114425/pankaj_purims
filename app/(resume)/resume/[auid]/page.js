import { getAuthor, getAuthorPubChart, getAuthorSubjectChart, getDocs, getMetrics, getSource } from "@/utils/mongo.js";

let dateFormatter = new Intl.DateTimeFormat("en-IN", { month: "long", year: "numeric", timeZone: "UTC" });
export default async function ResumeView({ params = { auid: "" } }) {
	const { auid } = params;
	if (!auid) {
		throw "No ID given!";
	}
	const authData = await getAuthor(auid);

	const metrics = await getMetrics({ auid: auid });
	const subjectChart = await getAuthorSubjectChart(auid);
	const { count, results: data } = await getDocs({
		authors: auid,
		sort: "citedByCount",
	});
	const pubChart = await getAuthorPubChart(auid);
	let impact = pubChart.reduce(
		(p, t) => p + (parseInt(t.metrics?.impactFactorData?.metrics?.impactMetrics?.jif) || 0) * t.value,
		0
	);
	data.splice(5);
	for (let doc of data) {
		let sourceData = await getSource(doc.source.sourceID);
		if (!sourceData.error) {
			if (sourceData.impactFactorData?.metrics?.impactMetrics?.jif) {
				doc.jif = sourceData.impactFactorData?.metrics?.impactMetrics?.jif;
			} else if (sourceData.citeScore) {
				doc.citeScore = sourceData.citeScore.currentMetric;
			}
		}
	}

	return (
		<div id="root" className="underline-links">
			<div style={{ opacity: 1, transform: "none" }}>
				<div
					data-page="1"
					className="relative bg-white"
					style={{ fontFamily: "var(--font-serif)", width: 793.8, minHeight: 1122.66 }}
				>
					<div className="grid min-h-[inherit] grid-cols-3">
						<div className="sidebar group flex flex-col">
							<div className="p-custom space-y-4 bg-primary text-background">
								<div>
									<h2 className="text-2xl font-bold">
										{authData.profile.firstName}{" "}
										{authData.profile.middleName ? `${authData.profile.middleName} ` : ""}
										{authData.profile.lastName || ""}
									</h2>
									<p>{authData.dept}</p>
								</div>
								<div className="flex flex-col items-start gap-y-2 text-sm">
									<div className="flex items-center gap-x-1.5">
										<i className="ph ph-bold ph-map-pin">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="12"
												fill="#ffffff"
												viewBox="0 0 256 256"
											>
												<path d="M128,60a44,44,0,1,0,44,44A44.05,44.05,0,0,0,128,60Zm0,64a20,20,0,1,1,20-20A20,20,0,0,1,128,124Zm0-112a92.1,92.1,0,0,0-92,92c0,77.36,81.64,135.4,85.12,137.83a12,12,0,0,0,13.76,0,259,259,0,0,0,42.18-39C205.15,170.57,220,136.37,220,104A92.1,92.1,0,0,0,128,12Zm31.3,174.71A249.35,249.35,0,0,1,128,216.89a249.35,249.35,0,0,1-31.3-30.18C80,167.37,60,137.31,60,104a68,68,0,0,1,136,0C196,137.31,176,167.37,159.3,186.71Z"></path>
											</svg>
										</i>
										<div>Panjab University</div>
									</div>
									{authData.profile.email && (
										<div className="flex items-center gap-x-1.5">
											<i className="ph ph-bold ph-at">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													width="12"
													height="12"
													fill="#ffffff"
													viewBox="0 0 256 256"
												>
													<path d="M128,20a108,108,0,0,0,0,216c22.27,0,45.69-6.73,62.64-18a12,12,0,1,0-13.29-20c-13,8.63-31.89,14-49.35,14a84,84,0,1,1,84-84c0,9.29-1.67,17.08-4.69,21.95-2.64,4.24-6,6.05-11.31,6.05s-8.67-1.81-11.31-6.05c-3-4.87-4.69-12.66-4.69-21.95V88a12,12,0,0,0-23.49-3.46,52,52,0,1,0,8.86,79.57C172.3,174.3,182.81,180,196,180c24.67,0,40-19.92,40-52A108.12,108.12,0,0,0,128,20Zm0,136a28,28,0,1,1,28-28A28,28,0,0,1,128,156Z"></path>
												</svg>
											</i>
											<a
												href={`mailto:${authData.profile.email.split(",")[0]}`}
												target="_blank"
												rel="noreferrer"
											>
												{authData.profile.email.split(",")[0]}
											</a>
										</div>
									)}
									<div className="flex items-center gap-x-1.5">
										<i className="ph ph-bold ph-link text-primary group-[.sidebar]:text-background">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												width="12"
												height="12"
												fill="#ffffff"
												viewBox="0 0 256 256"
											>
												<path d="M136.37,187.53a12,12,0,0,1,0,17l-5.94,5.94a60,60,0,0,1-84.88-84.88l24.12-24.11A60,60,0,0,1,152,99,12,12,0,1,1,136,117a36,36,0,0,0-49.37,1.47L62.53,142.55a36,36,0,0,0,50.92,50.92l5.94-5.94A12,12,0,0,1,136.37,187.53Zm74.08-142a60.09,60.09,0,0,0-84.88,0l-5.94,5.94a12,12,0,0,0,17,17l5.94-5.94a36,36,0,0,1,50.92,50.92l-24.11,24.12A36,36,0,0,1,120,139,12,12,0,1,0,104,157a60,60,0,0,0,82.3-2.43l24.12-24.11A60.09,60.09,0,0,0,210.45,45.55Z"></path>
											</svg>
										</i>
										<a
											href={`/author/55940987100/${auid}`}
											target="_blank"
											rel="noreferrer noopener nofollow"
											className="inline-block"
										>
											PU RIMS
										</a>
									</div>
								</div>
							</div>
							<div
								className="p-custom flex-1 space-y-4"
								style={{ backgroundColor: "rgba(37, 99, 235, 0.2)" }}
							>
								<section id="profiles" className="grid">
									<h4 className="mb-2 border-b border-primary text-base font-bold">Profiles</h4>
									<div
										className="grid gap-x-6 gap-y-3"
										style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
									>
										<div className="space-y-2">
											<div>
												<div>
													<div className="flex items-center gap-x-1.5">
														<img
															className="ph"
															width="14.3"
															height="14.3"
															alt="Scopus"
															src="https://cdn.simpleicons.org/scopus"
														/>
														<a
															href={`https://www.scopus.com/authid/detail.uri?authorId=${auid}`}
															target="_blank"
															rel="noreferrer noopener nofollow"
															className="inline-block"
														>
															{auid}
														</a>
													</div>
													<p className="text-sm">Scopus</p>
												</div>
											</div>
										</div>
										{authData.orcid && (
											<div className="space-y-2">
												<div>
													<div>
														<div className="flex items-center gap-x-1.5">
															<img
																className="ph"
																width="14.3"
																height="14.3"
																alt="ORCID"
																src="https://cdn.simpleicons.org/orcid"
															/>
															<a
																href={`https://orcid.org/${authData.orcid}`}
																target="_blank"
																rel="noreferrer noopener nofollow"
																className="inline-block"
															>
																{authData.orcid}
															</a>
														</div>
														<p className="text-sm">ORCID</p>
													</div>
												</div>
											</div>
										)}
									</div>
								</section>
								<section id="skills" className="grid">
									<h4 className="mb-2 border-b border-primary text-base font-bold">Metrics</h4>
									<div
										className="grid gap-x-6 gap-y-3"
										style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
									>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">Documents Published</div>
													<div>{metrics.docCount}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.docCount > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.docCount > 15 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.docCount > 30 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.docCount > 45 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.docCount > 60 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">Total Impact Factor</div>
													<div>{impact}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														impact > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														impact > 15 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														impact > 30 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														impact > 45 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														impact > 60 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">H-Index</div>
													<div>{metrics.hIndex}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.hIndex > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.hIndex >= 3 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.hIndex >= 6 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.hIndex >= 9 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.hIndex >= 12 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">I10-Index</div>
													<div>{metrics.i10Index}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.i10Index > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.i10Index >= 3 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.i10Index >= 6 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.i10Index >= 9 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.i10Index >= 12 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">Citation Count</div>
													<div>{metrics.citationCount}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.citationCount > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.citationCount > 100 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.citationCount > 200 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.citationCount > 300 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.citationCount > 400 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
										<div className="space-y-2">
											<div>
												<div>
													<div className="font-bold">Funded Documents</div>
													<div>{metrics.fundedCount}</div>
												</div>
											</div>
											<div className="flex items-center gap-x-1">
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.fundedCount > 0 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.fundedCount > 4 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.fundedCount > 8 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.fundedCount > 12 && "bg-primary"
													}`}
												></div>
												<div
													className={`h-2.5 w-5 border border-primary ${
														metrics.fundedCount > 16 && "bg-primary"
													}`}
												></div>
											</div>
										</div>
									</div>
								</section>
								<section id="interests" className="grid">
									<h4 className="mb-2 border-b border-primary text-base font-bold">Interests</h4>
									<div
										className="grid gap-x-6 gap-y-3"
										style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
									>
										{subjectChart
											.sort((a, b) => b.value - a.value)
											.slice(0, 4)
											.map(({ id }) => (
												<div className="space-y-1">
													<div>
														<div className="font-bold">{id}</div>
													</div>
												</div>
											))}
									</div>
								</section>
							</div>
						</div>
						<div className="main group col-span-2">
							<div className="p-custom space-y-4" style={{ backgroundColor: "rgba(37, 99, 235, 0.2)" }}>
								<section id="summary">
									<div className="wysiwyg" style={{ columns: 1 }}>
										<p>{authData.llm}</p>
									</div>
								</section>
							</div>
							<div className="p-custom space-y-4">
								<section id="publications" className="grid">
									<h4 className="mb-2 border-b border-primary text-base font-bold">
										Most Cited Publications
									</h4>
									<div
										className="grid gap-x-6 gap-y-3"
										style={{ gridTemplateColumns: "repeat(1, 1fr)" }}
									>
										{data.map((doc) => (
											<div className="space-y-2">
												<div>
													<div className="flex items-center justify-between group-[.sidebar]:flex-col group-[.sidebar]:items-start">
														<div className="text-left">
															<div className="font-bold">{doc.title}</div>
															<div>
																{doc.source.publicationName}
																{(doc.jif || doc.citeScore) && <br />}
																<em>
																	{doc.jif
																		? `Journal Impact Factor: ${doc.jif}`
																		: doc.citeScore
																		? `CiteScore: ${doc.citeScore}`
																		: ""}
																</em>
															</div>
														</div>
														<div className="shrink-0 text-right group-[.sidebar]:text-left">
															<div className="font-bold">
																{doc.coverDate &&
																	dateFormatter.format(new Date(doc.coverDate))}
															</div>
														</div>
													</div>
													{doc.doi ? (
														<div className="flex items-center gap-x-1.5">
															<img
																className="ph"
																width="14.3"
																height="14.3"
																alt="DOI"
																src="https://cdn.simpleicons.org/doi"
															/>
															<a
																href={`https://doi.org/${doc.doi}`}
																target="_blank"
																rel="noreferrer noopener nofollow"
																className="inline-block"
															>
																https://doi.org/{doc.doi}
															</a>
														</div>
													) : (
														<div className="flex items-center gap-x-1.5">
															<img
																className="ph"
																width="14.3"
																height="14.3"
																alt="ORCID"
																src="https://cdn.simpleicons.org/doi"
															/>
															<a
																href={`https://www.scopus.com/inward/record.uri?partnerID=HzOxMe3b&scp=${doc._id}&origin=inward`}
																target="_blank"
																rel="noreferrer noopener nofollow"
																className="inline-block"
															>
																doc._id
															</a>
														</div>
													)}
												</div>
												<div className="wysiwyg">
													<p>Cited By: <b>{doc.citedByCount}</b></p>
												</div>
											</div>
										))}
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
