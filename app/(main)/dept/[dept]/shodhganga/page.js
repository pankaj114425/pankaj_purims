import api from "@/utils/api";
import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Link from "next/link";
import DocChips from "@/components/docChips";
import { getDepartmentNames, getDepts, getShodh } from "@/utils/mongo";
import ShodhgangaFilters from "@/components/shodhgangaFilter";
import ShodhList from "@/components/ShodhList";
import SearchBar from "@/components/searchBar";

// export default async function DeptAuthors({ params = { dept: "" }, searchParams = { page: 1 } }) {
// 	const dept = decodeURIComponent(params.dept);
// 	if (!dept) {
// 		throw "No ID given!";
// 	}
// 	let page = parseInt(searchParams.page) || 1;
// 	if (page < 1) {
// 		throw "Invalid page number!";
// 	}
// 	let urlParams = new URLSearchParams(searchParams);
// 	const ganga = await getShodh({ ...searchParams, dept });
// 	return (
// 		<>
// 			<ShodhgangaFilters className="col-span-4 row-span-2" />
// 			<ShodhList className="col-span-8" data={ganga} total={ganga.count} page={page} />
// 			<PageSelect className="col-span-8" urlParams={urlParams} page={page} docCount={ganga.count} />
// 		</>
// 	);
// }

export default async function DeptAuthors({ params = { dept: "" }, searchParams = { page: 1 } }) {
	const dept = decodeURIComponent(params.dept);
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
	  throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const ganga = await getShodh({...searchParams, dept: dept === 'pu' ? null : dept });

	
	const depts = await getDepartmentNames();
	return (
	  <>

		<ShodhgangaFilters deptData={depts} className="col-span-4 row-span-2" />
		<div className="col-span-8 grid-12">
		  <SearchBar urlParams={urlParams} value={searchParams.s} />
		  <ShodhList
			className="col-span-12"
			data={ganga}
			total={ganga.count}
			page={page}
		  />
		  <PageSelect
			className={"col-span-12"}
			urlParams={urlParams}
			page={page}
			docCount={ganga.count}
		  />
		</div>
	  </>
	);
  }
  



function Thesis({ shodh }) {
	return (
		<Card className="my-5">
			<CardContent className="flex flex-row p-2 py-4">
				<div className="flex-1">
					<a className="doc-link pr-8 flex flex-col items-start" href={shodh._id}>
						<div className="text-sm">{shodh["dc:type:degree"] || ""}</div>
						<div className="doc-title text-xl serif">{shodh["dc:title"]}</div>
						<div className="text-base">{shodh["dc:creator:researcher"]}</div>
						<div className="text-base">Guided by: {shodh["dc:contributor:guide"]}</div>
						<div>Date Awarded: {shodh["dc:date:awarded"]}</div>
					</a>
					<DocChips data={shodh} className="flex flex-wrap flex-row gap-2 mt-2" />
				</div>
			</CardContent>
		</Card>
	);
}