import Author from "./author";
import ActiveLinkChip from "@/components/UI/ActiveLinkChip";
import { getAuthor } from "@/utils/mongo";

// const id = "55940987100";

export default async function AuthorLayout({ children, params = { auid: "" } }) {
	const { auid } = params;
	if (!auid) {
		throw "No ID given!";
	}
	const authData = await getAuthor(auid);
	return (
		<main id="main" className="grid-12 max-w-7xl mx-auto ">
			<div className="col-span-12 gap-5 flex flex-row overflow-x-auto p-2 w-full " >
				<ActiveLinkChip slug={null} href={`/author/${auid}/`}>
					Overview
				</ActiveLinkChip>
				<ActiveLinkChip slug={"documents"} href={`/author/${auid}/documents`}>
					Documents
				</ActiveLinkChip>
				<ActiveLinkChip slug={"shodhganga"} href={`/author/${auid}/shodhganga`}>
					Shodhganga
				</ActiveLinkChip>
				<ActiveLinkChip slug={"resume"} href={`/author/${auid}/resume`}>
					Résumé
				</ActiveLinkChip>
				<ActiveLinkChip slug={"reportgen"} href={`/author/${auid}/reportgen`}>
					Reports
				</ActiveLinkChip>
				<ActiveLinkChip slug={"projects"} href={`/author/${auid}/projects`}>
					Projects
				</ActiveLinkChip>
			</div>
			<Author data={authData} className="col-span-12 self-stretch" />
			{children}
		</main>
	);
}
