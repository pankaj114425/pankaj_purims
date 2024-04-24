"use client";
import Link from "next/link";
import Button from "./UI/Button";
import CardContent from "./UI/CardContent";
import { useState } from "react";
import Card from "./UI/Card";
import { useSearchParams } from "next/navigation";

let sortTypes = [
	["citationCount", "Citations"],
	["profile.firstName", "Name"],
	["docCount", "Documents"],
	["i10Index", "I10 Index"],
];
let orderTypes = [
	["descending", "Descending"],
	["ascending", "Ascending"],
];

export default function AuthorFilters({ data, ...props }) {
	let params = useSearchParams();
	let [sort, setSort] = useState(params.get("sort") || sortTypes[0][0]);
	let [order, setOrder] = useState(params.get("order") || orderTypes[0][0]);
	return (
		<div {...props}>
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
			<Card className="sticky bottom-0 mt-2">
				<CardContent className="text-xl flex flex-row items-stretch justify-center gap-2">
					<Button className="flex-1">Reset</Button>
					<Button
						className="flex-1"
						variant="filled"
						component={Link}
						href={{ href: ".", query: { ...Object.fromEntries(params.entries()), page: 1, sort, order } }}
					>
						Apply
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
