import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import { getDepartment, getDepartmentPubChart, getDepartmentSubtypeChart, getDepartmentWorldChart, getDocs } from "@/utils/mongo";
import SearchBar from "@/components/searchBar";

export default async function DeptAuthors({ params = { dept: "" }, searchParams = { page: 1 } }) {
	const dept = decodeURIComponent(params.dept);
	if (!dept) {
		throw "No ID given!";
	}
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const deptData = await getDepartment(dept);
	deptData.charts = {
		typeChart: await getDepartmentSubtypeChart(dept),
		pubChart: await getDepartmentPubChart(dept),
		world: await getDepartmentWorldChart(dept)
	}
	const data = await getDocs({
		...searchParams,
		depts: dept,
	});
	return (
		<>
			<DocumentFilters data={deptData} className="col-span-4 row-span-2" />
			<div className="col-span-8 grid-12">
			<SearchBar urlParams={urlParams} value={searchParams.s} />
			<DocumentList page={page} data={data} className="col-span-12" />
			<PageSelect
				className="col-span-12"
				urlParams={urlParams}
				page={page}
				docCount={data.count || deptData.docCount}
			/>
			</div>
			
		</>
	);
}
