"use client";
import { useState } from "react";
import Button from "./UI/Button";
import Link from "next/link";
import Card from "./UI/Card";
import CardContent from "./UI/CardContent";

export default function TimePicker({ min = 1947, max = 2024, fromD = 1947, toD = 2024, subject }) {
	let [from, setFrom] = useState(`${fromD > min ? fromD : min}-01`);
	let [to, setTo] = useState(`${toD < max ? toD : max}-12`);
	return (
		<div className="text-center col-span-12">
			<div className="my-6">
				<div className="mb-4 huge-text">
					Generate Report for {subject}
				</div>
				<div className="big-text">
					From:{" "}
					<input
						min={`${min}-01`}
						max={`${max}-12`}
						type="month"
						value={from}
						onChange={(e) => setFrom(e.target.value)}
						style={{ backgroundColor: "inherit", marginRight: "64px" }}
					/>{" "}
					To:{" "}
					<input
						min={`${min}-01`}
						max={`${max}-12`}
						type="month"
						value={to}
						onChange={(e) => setTo(e.target.value)}
						style={{ backgroundColor: "inherit" }}
					/>
				</div>
			</div>
			<Button
				component={Link}
				href={{ pathname: "report", query: { from, to } }}
				className="text-xl"
				variant="filled"
			>
				Generate Report
			</Button>
		</div>
	);
}
