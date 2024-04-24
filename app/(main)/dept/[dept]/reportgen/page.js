import {
	getDepartment,
	getDepartmentYearlyChart,
} from "@/utils/mongo";
import TimePicker from "@/components/TimeRange";

// const id = "55940987100";

export default async function DepartmentView({ params = { dept: "" }, searchParams }) {
	const dept = decodeURIComponent(params.dept);;
	if (!dept) {
		throw "No ID given!";
	}
	const deptData = await getDepartment(dept);
	// const data = await getDocs({
	// 	authors: auid,
	// 	from: searchParams.from,
	// 	to: searchParams.to,
	// });
	const yearlyChart = await getDepartmentYearlyChart(dept, { from: searchParams.from, to: searchParams.to });
	let years = yearlyChart.map((y) => y.x);

	return (
		<TimePicker
			subject={deptData.name || dept}
			fromD={searchParams.from}
			toD={searchParams.to}
			min={Math.min(...years)}
			max={Math.max(...years)}
			isAllTime={!(searchParams.from && searchParams.to)}
		/>
	);
}
