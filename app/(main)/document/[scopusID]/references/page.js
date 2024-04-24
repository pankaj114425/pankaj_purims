import ReferenceList from "@/components/referenceList";
import { getDocRefsByScopusID } from "@/utils/mongo";

export default async function DocumentReferenceView({ params = { scopusID: null } }) {
	let url = "/docs";
	if (params.scopusID) url += "?sid=" + params.scopusID;
	else throw "doc not found!";
	let referenceData = await getDocRefsByScopusID(params.scopusID);
	return <ReferenceList className="col-span-8" data={referenceData} />;
}
