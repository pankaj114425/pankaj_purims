import api from "@/utils/api";
import Link from "next/link";
import Department from "./department";
import ActiveLinkChip from "@/components/UI/ActiveLinkChip";
import { getDepartment } from "@/utils/mongo";

// const id = "55940987100";

export default async function DepartmentView({ children, params = { dept: "" } }) {
	const dept = decodeURIComponent(params.dept);
	if (!dept) {
		throw "No ID given!";
	}
	const data = await getDepartment(dept);
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto">
			<div className="col-span-12 gap-5 flex flex-row w-full overflow-auto p-2">
				<ActiveLinkChip slug={null} href={`/dept/${dept}/`}>
					Overview
				</ActiveLinkChip>
				{/* <Link className="mr-6" href={"/dept"}>
					Faculties
				</Link> */}
				<ActiveLinkChip slug={"faculty"} href={ dept ==='pu'  ? "/dept": `/dept/${dept}/faculty` }>
					Faculties
				</ActiveLinkChip>
				<ActiveLinkChip slug={"authors"} href={`/dept/${dept}/authors`}>
					Authors
				</ActiveLinkChip>
				<ActiveLinkChip slug={"documents"} href={`/dept/${dept}/documents`}>
					Documents
				</ActiveLinkChip>
				<ActiveLinkChip slug={"shodhganga"} href={`/dept/${dept}/shodhganga`}>
					Shodhganga
				</ActiveLinkChip>
				<ActiveLinkChip slug={"reportgen"} href={`/dept/${dept}/reportgen`}>
					Reports
				</ActiveLinkChip>
			</div>
			<Department data={data} className="col-span-12 self-stretch p-5" />
			{children}
		</main>
	);
}
