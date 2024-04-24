import Link from "next/link";

export default async function PageSelect({ className, page = 1, docCount, pageSize = 25, urlParams }) {
	let max = Math.ceil(docCount / pageSize);
	return (
		<div className={"flex flex-row justify-between items-center " + className}>
			{page === 1 ? (
				<div className="block px-4 py-2 relative rounded-md card">Prev</div>
			) : (
				<Link
					href={{ href: ".", query: (urlParams.set("page", page - 1), urlParams.toString()) }}
					className="card block px-4 py-2 relative rounded-md shadow-md"
				>
					Prev
				</Link>
			)}
			<div className="card flex items-center justify-center w-12 h-12 text-center text-xl relative rounded-lg shadow-md">
				{page}
			</div>
			{page === max ? (
				<div className="card block px-4 py-2 relative rounded-md text-slate-600 bg-slate-200">Next</div>
			) : (
				<Link
					href={{ href: ".", query: (urlParams.set("page", page + 1), urlParams.toString())  }}
					className="card block px-4 py-2 relative rounded-md shadow-md"
				>
					Next
				</Link>
			)}
		</div>
	);
}