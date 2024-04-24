import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import ReferenceList from "@/components/referenceList";
import { getDocByScopusID } from "@/utils/mongo";

export default async function DocumentView({ params = { scopusID: null } }) {
	let url = "/doc";
	if (params.scopusID) url += "/" + params.scopusID;
	else throw "doc not found!";
	let data = await getDocByScopusID(params.scopusID);
	return (
		<>
			<Abstract data={data} className="col-span-8" />
			<ReferenceList
				className="col-span-8"
				data={data}
				viewAll={data.refCount > 5 && data.reference?.length == 5}
				viewAllLink={`/document/${params.scopusID}/references`}
			/>
		</>
	);
}

function Abstract({ data, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<h2>Abstract</h2>
				<div className="font-serif text-justify py-3 border-divider">
					{data.description != "" ? data.description : "No description found."}
				</div>
			</CardContent>
		</Card>
	);
}
