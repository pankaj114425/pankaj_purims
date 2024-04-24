import {
	getAuthor,
	getAuthorMetrics,
	getAuthorPositions,
	getAuthorPubChart,
	getAuthorSocialMetrics,
	getAuthorSubjectChart,
	getAuthorSubtypeChart,
	getAuthorWorldChart,
	getAuthorYearlyChart,
	getCoauthors,
	getDocs,
	getMetrics,
} from "@/utils/mongo";
import TimePicker from "@/components/TimeRange";
import alpha3 from "@/utils/alpha3";
import Card from "@/components/UI/Card.js";
import CardContent from "@/components/UI/CardContent.js";
import Button from "@/components/UI/Button.js";
import PrintButton from "./PrintButton.js";
import Link from "next/link.js";

// const id = "55940987100";

export default async function AuthorResume({ params = { auid: "" } }) {
	const { auid } = params;
	if (!auid) {
		throw "No ID given!";
	}

	return (
		<>
			<Card className="col-span-8">
				<CardContent>
					<h2>Résumé Generation (Experimental)</h2>
					<div className="overflow-x-auto">
						<iframe id="resume-iframe" width={793.8} height={1122.66} style={{aspectRatio: 1122.66 / 793.8}} src={`/resume/${auid}`}></iframe>
					</div>
				</CardContent>
			</Card>
			<Card className="col-span-4">
				<CardContent>
					<h2>Download PDF</h2>
					<p>
						Download a PDF of your resume. This file can be used to print your resume, send it to recruiters, or upload on job portals.
					</p>
					<br />
					<PrintButton>Download</PrintButton>
				</CardContent>
			</Card>
		</>
	);
}
