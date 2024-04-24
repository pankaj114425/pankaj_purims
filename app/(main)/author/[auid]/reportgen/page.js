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

// const id = "55940987100";

export default async function AuthorView({ params = { auid: "" }, searchParams }) {
	const { auid } = params;
	
	if (!auid) {
		throw "No ID given!";
	}
	const authData = await getAuthor(auid);
	// const data = await getDocs({
	// 	authors: auid,
	// 	from: searchParams.from,
	// 	to: searchParams.to,
	// });
	const yearlyChart = await getAuthorYearlyChart(auid, { from: searchParams.from, to: searchParams.to });
	let years = yearlyChart.map((y) => y.x);
    
	return (
		<TimePicker
			subject={`${authData.profile.lastName}${authData.profile.lastName && ", "}${authData.profile.firstName} ${authData.profile.middleName || ""}`}
			fromD={searchParams.from}
			toD={searchParams.to}
			min={Math.min(...years)}
			max={Math.max(...years)}
			isAllTime={!(searchParams.from && searchParams.to)}
		/>
	);
}
