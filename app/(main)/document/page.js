import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import SearchBar from "@/components/searchBar";
import { getDepartment, getDepartmentPubChart, getDepartmentSubtypeChart, getDepartmentWorldChart, getDocs } from "@/utils/mongo";

export default async function DocumentAuthor({ searchParams = { page: 1 } }) {
	
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const puData = await getDepartment("pu");
	puData.charts = {
		typeChart: await getDepartmentSubtypeChart("pu"),
		pubChart: await getDepartmentPubChart("pu"),
		world: await getDepartmentWorldChart("pu")
	}
	const data = await getDocs({
		...searchParams
	});
	
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">Documents</div>
			</div>
			<DocumentFilters data={puData} className="col-span-4 row-span-3" />
			<div className="col-span-8 grid-12">
				<SearchBar urlParams={urlParams} value={searchParams.s} />
				<DocumentList total={data.count} page={page} data={data} className="col-span-12" />
				<PageSelect
					urlParams={urlParams}
					page={page}
					docCount={data.count || puData.docCount}
					className={"col-span-12"}
				/>
			</div>
		</main>
	);
}
