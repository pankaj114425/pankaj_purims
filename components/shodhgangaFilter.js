"use client";
import Link from "next/link";
import Button from "./UI/Button";
import CardContent from "./UI/CardContent";
import { useState } from "react";
import Card from "./UI/Card";
import { useSearchParams } from "next/navigation";
import Checkbox from "./UI/Checkbox";
import alpha3 from "@/utils/alpha3";

let sortTypes = [
	["dc:date:awarded", "Date Awarded"],
	["dc:title", "Title"],
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

export default function ShodhgangaFilters({ deptData, className, ...props }) {
	let params = useSearchParams();
	// console.log(params.get("sort"))
	let [sort, setSort] = useState(params.get("sort") || sortTypes[0][0]);
	let [order, setOrder] = useState(params.get("order") || orderTypes[0][0]);
	let [dept, setDept] = useState(params.get("dept") || "");
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
				</CardContent>
			</Card>
			{deptData && <Card>
				<CardContent>
					<div className="border-b-2 border-slate-300">
						<div className="text-3xl pt-2">Department</div>
						<div className="overflow-y-scroll max-h-450 px-2 pb-1">
							<label className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between">
								<div className="text-lg">All</div>
								<input
									className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
									type="checkbox"
									checked={dept == ""}
									onChange={(e) => {
										if (dept != "") {
											setDept("");
										} else e.preventDefault();
									}}
								/>
							</label>
							{deptData.map((id, i) => (
								<label
									key={id}
									className="flex flex-row py-1 border-y-2 border-t-transparent border-slate-300 items-center justify-between"
								>
									<div className="text-lg">{id}</div>
									<Checkbox
										className="cursor-pointer w-6 h-6 m-2 flex-shrink-0"
										checked={dept == "" ? null : dept.split(",").includes(id)}
										onChange={(e) => {
											if (e.target.checked) {
												setDept(addToParam(dept, id));
											} else setDept(deleteFromParam(dept, id));
										}}
									/>
								</label>
							))}
						</div>
					</div>
				</CardContent>
			</Card>}
			<Card className="sticky bottom-0">
				<CardContent className="text-xl flex flex-row items-stretch justify-center gap-2">
					<Button className="flex-1">Reset</Button>
					<Button
						className="flex-1"
						variant="filled"
						component={Link}
						href={{
							href: ".",
							query: { ...Object.fromEntries(params.entries()), page: 1, sort, order, dept },
						}}
					>
						Apply
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
