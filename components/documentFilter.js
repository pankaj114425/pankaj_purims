"use client";
import Link from "next/link";
import Button from "./UI/Button";
import CardContent from "./UI/CardContent";
import { useState } from "react";
import Card from "./UI/Card";
import { useSearchParams } from "next/navigation";
import Checkbox from "./UI/Checkbox";
import alpha3 from "@/utils/alpha3";

const sy = 1962;
const ey = 2024;
const yearArray = [];
for (let i = sy; i <= ey; i++) yearArray.push(i);

let sortTypes = [
	["coverDate", "Date"],
	["citedByCount", "Citations"],
	["title", "Title"],
	["crossref.citedByCount", "Crossref Citations"],
];
let orderTypes = [
	["descending", "Descending"],
	["ascending", "Ascending"],
];

function addToParam(p = "", q = "") {
	let t = p == "" ? [] : p.split(",");
	t.push(q);
	return t.join(",");
}

function deleteFromParam(p = "", q = "") {
	let t = p.split(",");
	t.splice(t.indexOf(q), 1);
	return t.join(",");
}

export default function DocumentFilters({ data, coauthors = false, className, ...props }) {
	let params = useSearchParams();
	let [sort, setSort] = useState(params.get("sort") || sortTypes[0][0]);
	let [order, setOrder] = useState(params.get("order") || orderTypes[0][0]);
	let [pub, setPub] = useState(params.get("pub") || "");
	let [type, setType] = useState(params.get("type") || "");
	let [country, setCountry] = useState(params.get("country") || "");
	let [coauthor, setCoauthor] = useState(params.get("coauthor") || "");
	let [startYear, setStartYear] = useState(params.get("from") || sy);
	let [endYear, setEndYear] = useState(params.get("to") || ey);
	return (
		<div className={"flex flex-col gap-4 " + className} {...props}>
			<Card>
				<CardContent>
					<div className="border-b-2 pb-2 border-slate-300">
						<div className="text-3xl">Filters</div>
					</div>
					<div className="border-b-2 py-2 border-slate-300">
						<label className="flex flex-row items-center justify-between">
							<span className="text-xl">Sorting:</span>
							<select
								className="py-1.5 px-2 border-2 rounded-md border-slate-300"
								onChange={(e) => setSort(e.target.value)}
								value={sort}
							>
								{sortTypes.map(([value, text]) => (
									<option key={value} value={value}>
										{text}
									</option>
								))}
							</select>
						</label>
					</div>
					<div className="border-b-2 py-2 border-slate-300">
						<label className="flex flex-row items-center justify-between">
							<span className="text-xl">Order:</span>
							<select
								className="py-1.5 px-2 border-2 rounded-md border-slate-300"
								onChange={(e) => setOrder(e.target.value)}
								value={order}
							>
								{orderTypes.map(([value, text]) => (
									<option key={value} value={value}>
										{text}
									</option>
								))}
							</select>
						</label>
					</div>
					{!params.get("nodate") && <div className="border-b-2 py-2 border-slate-300">
						<label className="flex flex-row items-center justify-between">
							<span className="text-xl">From:</span>
							<select
								className="py-1.5 px-2 border-2 rounded-md border-slate-300"
								onChange={(e) => setStartYear(e.target.value)}
								value={startYear}
							>
								{yearArray.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</select>
						</label>
					</div>}
					{!params.get("nodate") && <div className="border-b-2 py-2 border-slate-300">
						<label className="flex flex-row items-center justify-between">
							<span className="text-xl">To:</span>
							<select
								className="py-1.5 px-2 border-2 rounded-md border-slate-300"
								onChange={(e) => setEndYear(e.target.value)}
								value={endYear}
							>
								{yearArray.map((v) => (
									<option key={v} value={v}>
										{v}
									</option>
								))}
							</select>
						</label>
					</div>}
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<div className="border-b-2 border-slate-300">
						<div className="text-3xl pt-2">Article Type</div>
						<div className="overflow-y-scroll max-h-450 px-2 pb-1">
							<label className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
								<div className="text-lg">All</div>
								<input
									className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
									type="checkbox"
									checked={type == ""}
									onChange={(e) => {
										if (type != "") {
											setType("");
										} else e.preventDefault();
									}}
								/>
							</label>
							{data.charts.typeChart
								.filter((t) => t.id != "undefined")
								.map(({ id }, i) => (
									<label key={i} className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
										<div className="text-lg">{id}</div>
										<Checkbox
											className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
											checked={type == "" ? null : type.split(",").includes(id)}
											onChange={(e) => {
												if (e.target.checked) {
													setType(addToParam(type, id));
												} else setType(deleteFromParam(type, id));
											}}
										/>
									</label>
								))}
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<div className="border-b-2 border-slate-300">
						<div className="text-3xl pt-2">Publications</div>
						<div className="overflow-y-scroll max-h-450 px-2 pb-1">
							<label className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
								<div className="text-lg">All</div>
								<input
									className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
									type="checkbox"
									checked={pub == ""}
									onChange={(e) => {
										if (pub != "") {
											setPub("");
										} else e.preventDefault();
									}}
								/>
							</label>
							{data.charts.pubChart.map(({ label, id }, i) => (
								<label key={i} className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
									<div className="text-lg">{label}</div>
									<Checkbox
										className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
										checked={pub == "" ? null : pub.split(",").includes(id)}
										onChange={(e) => {
											if (e.target.checked) {
												setPub(addToParam(pub, id));
											} else setPub(deleteFromParam(pub, id));
										}}
									/>
								</label>
							))}
						</div>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardContent>
					<div className="border-b-2 border-slate-300">
						<div className="text-3xl pt-2">Coauthor Country</div>
						<div className="overflow-y-scroll max-h-450 px-2 pb-1">
							<label className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
								<div className="text-lg">All</div>
								<input
									className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
									type="checkbox"
									checked={country == ""}
									onChange={(e) => {
										if (country != "") {
											setCountry("");
										} else e.preventDefault();
									}}
								/>
							</label>
							{data.charts.world
								.sort((a, b) => b.value - a.value)
								.map(({ id, value }, i) => (
									<label key={i} className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
										<div className="text-lg">{alpha3(id)}</div>
										<Checkbox
											className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
											checked={country == "" ? null : country.split(",").includes(id)}
											onChange={(e) => {
												if (e.target.checked) {
													setCountry(addToParam(country, id));
												} else setCountry(deleteFromParam(country, id));
											}}
										/>
									</label>
								))}
						</div>
					</div>
				</CardContent>
			</Card>
			{coauthors && (
				<Card>
					<CardContent>
						<div className="border-b-2 border-slate-300">
							<div className="text-3xl pt-2">Coauthors</div>
							<div className="overflow-y-scroll max-h-450 px-2 pb-1">
								<label className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
									<div className="text-lg">All</div>
									<input
										className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
										type="checkbox"
										checked={coauthor == ""}
										onChange={(e) => {
											if (coauthor != "") {
												setCoauthor("");
											} else e.preventDefault();
										}}
									/>
								</label>
								{data.charts.coData
									.sort((a, b) => b.count - a.count)
									.map(({ givenName, surname, _id }, i) => (
										<label
											key={i}
											className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between"
										>
											<div className="text-lg">
												{surname}
												{surname && givenName ? ", " : " "}
												{givenName}
											</div>
											<Checkbox
												className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
												checked={coauthor == "" ? null : coauthor.split(",").includes(_id)}
												onChange={(e) => {
													if (e.target.checked) {
														setCoauthor(addToParam(coauthor, _id));
													} else setCoauthor(deleteFromParam(coauthor, _id));
												}}
											/>
										</label>
									))}
							</div>
						</div>
					</CardContent>
				</Card>
			)}
			<Card className="sticky bottom-0">
				<CardContent className="text-xl flex flex-row items-stretch justify-center gap-2">
					<Button className="flex-1">Reset</Button>
					<Button
						className="flex-1"
						variant="filled"
						component={Link}
						href={{
							href: ".",
							query: {
								...Object.fromEntries(params.entries()),
								page: 1,
								...(sort != sortTypes[0][0] && { sort }),
								...(order != orderTypes[0][0] && { order }),
								...(pub != "" && { pub }),
								...(type != "" && { type }),
								...(country != "" && { country }),
								...(coauthors && coauthor != "" && { coauthor }),
								...((startYear != sy || endYear != ey) && { from: startYear }),
								...((startYear != sy || endYear != ey) && { to: endYear }),
							},
						}}
					>
						Apply
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
