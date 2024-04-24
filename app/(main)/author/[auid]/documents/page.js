import api from "@/utils/api";
import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import SearchBar from "@/components/searchBar";
import { getAuthor, getAuthorPubChart, getAuthorSubtypeChart, getAuthorWorldChart, getCoauthors, getDocs } from "@/utils/mongo";

export default async function DocumentAuthor({ params = { auid: "" }, searchParams = { page: 1 } }) {
	const { auid } = params;
	if (!auid) {
		throw "No ID given!";
	}
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const authData = await getAuthor(auid);
	authData.charts = {
		typeChart: await getAuthorSubtypeChart(auid),
		pubChart: await getAuthorPubChart(auid),
		world: await getAuthorWorldChart(auid),
		coData: await getCoauthors(auid),
	}
	const data = await getDocs({
		...searchParams,
		authors: auid,
	});
	return (
		<>
			<DocumentFilters data={authData} coauthors className="col-span-4" />
			<div className="col-span-8 grid-12">
				<SearchBar urlParams={urlParams} />
				<DocumentList total={data.count} page={page} data={data} className="col-span-12" />
				<PageSelect
					urlParams={urlParams}
					page={page}
					docCount={data.count || authData.docCount}
					className={"col-span-12"}
				/>
			</div>
		</>
	);
}
