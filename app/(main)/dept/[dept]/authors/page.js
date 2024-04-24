import api from "@/utils/api";
import Link from "next/link";
import AuthorList from "@/components/authorList";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import { getAuthorsByDept, getDepartment } from "@/utils/mongo";

export default async function DeptAuthors({ params = { dept: "" }, searchParams = { page: 1 } }) {
	const dept = decodeURIComponent(params.dept);
	if (!dept) {
		throw "No ID given!";
	}
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	const data = await getDepartment(dept);
	const authors = await getAuthorsByDept(dept);
	
	return (
		<>
			<Filters data={data} className="col-span-4" />
			<AuthorList page={page} authCount={data.authorCount} data={authors} className="col-span-8" />
			<PageSelect page={page} itemCount={data.authorCount} />
		</>
	);
}

async function PageSelect({ page = 1, itemCount, pageSize = 25 }) {
	let max = Math.ceil(itemCount / pageSize);
	return (
		<div className="col-span-8 col-start-5 flex flex-row justify-between items-center">
			{page === 1 ? (
				<div className="block px-4 py-2 relative rounded-md text-slate-600 bg-slate-200">Prev</div>
			) : (
				<Link
					href={{ href: ".", query: { page: page - 1 } }}
					className="block text-blue-300 px-4 py-2 relative rounded-md bg-white shadow-md"
				>
					Prev
				</Link>
			)}
			<div className="text-blue-300 flex items-center justify-center w-12 h-12 text-center text-xl relative rounded-lg bg-white shadow-md">
				{page}
			</div>
			{page === max ? (
				<div className="block px-4 py-2 relative rounded-md text-slate-600 bg-slate-200">Next</div>
			) : (
				<Link
					href={{ href: ".", query: { page: page + 1 } }}
					className="block text-blue-300 px-4 py-2 relative rounded-md bg-white shadow-md"
				>
					Next
				</Link>
			)}
		</div>
	);
}

async function Filters({ data, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<div className="text-2xl">
					{data.authorCount} Authors Found
				</div>
			</CardContent>
		</Card>
	);
}