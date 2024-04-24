import api from "@/utils/api";
import DocumentList from "@/components/documentList";
import DocumentFilters from "@/components/documentFilter";
import PageSelect from "@/components/PageSelect";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Link from "next/link";
import DocChips from "@/components/docChips";
import { getDepartmentNames, getDepts, getProjects } from "@/utils/mongo";
import ProjectFilters from "@/components/projectFilters";
import ProjectList from "@/components/ProjectList";

export default async function Projects({ searchParams = { page: 1 } }) {
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	let urlParams = new URLSearchParams(searchParams);
	const project = await getProjects({ dept: "pu", ...searchParams });
	const depts = await getDepartmentNames();
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 text-center my-4">
				<div className="huge-text">Projects</div>
			</div>
			<ProjectFilters deptData={depts} className="col-span-4 row-span-2" />
			<ProjectList className="col-span-8" data={project} total={project.count} page={page} />
			<PageSelect className="col-span-8" urlParams={urlParams} page={page} docCount={project.count} />
		</main>
	);
}
