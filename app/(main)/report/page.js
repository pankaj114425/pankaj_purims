import PageSelect from "@/components/PageSelect";
import SearchBar from "@/components/searchBar";
import {
	getAuthors,
	getDepartment,
} from "@/utils/mongo";
import AuthorList from "@/components/authorList";
import AuthorFilters from "@/components/AuthorFilters";

export default async function Authors({ searchParams = { page: 1 } }) {
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const { count, results } = await getAuthors({...searchParams});
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">Generate Report For :</div>
			</div>
			<AuthorFilters className="col-span-4" />
			<div className="col-span-8 grid-12">
				<SearchBar urlParams={urlParams} value={searchParams.s} className="col-span-12" />
				<AuthorList page={page} authCount={count} data={results} linkSuffix="reportgen" className="col-span-12" />
				<PageSelect page={page} urlParams={urlParams} itemCount={count} className={"col-span-12"} />
			</div>
		</main>
	);
}
