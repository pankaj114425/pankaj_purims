import AuthorFilters from "@/components/AuthorFilters";
import FacultyFilters from "@/components/FacultyFilter";
import PageSelect from "@/components/PageSelect";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import SearchBar from "@/components/searchBar";
import { getDepts } from "@/utils/mongo";
import Link from "next/link";

export default async function Departments({ searchParams = {} }) {
	const data = await getDepts(searchParams);
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">Faculties, Departments & Centres</div>
			</div>
			<FacultyFilters className="col-span-4" />
			<div className="col-span-8 grid-12">
				<div className="col-span-12">
					<CardContent className="text-2xl">{data.length} results found</CardContent>
				</div>
				{data.map((a, i) => (
					<Card className={`col-span-12 p-4 h-full}`} key={i}>
						<Link href={`/dept/${a._id}`} className="h-full flex flex-col w-full">
							<h2 className="text-xl grow">{a.name}</h2>
							<div className="flex flex-row w-full items-center justify-between pr-3">
								<div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
									{a.citationCount}
									<div className="text-sm sans-serif font-semibold">Citations</div>
								</div>
								<div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
									{a.authorCount}
									<div className="text-sm sans-serif font-semibold">Authors</div>
								</div>
								<div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
									{a.hIndex}
									<div className="text-sm sans-serif font-semibold">H-Index</div>
								</div>
								<div className="text-3xl font-mono font-bold pl-2 pr-8 border-l-4 border-blue-600">
									{a.i10Index}
									<div className="text-sm sans-serif font-semibold">I-10 Index</div>
								</div>
							</div>
						</Link>
					</Card>
				))}
			</div>
		</main>
	);
}
