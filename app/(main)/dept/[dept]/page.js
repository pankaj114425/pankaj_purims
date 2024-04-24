import api from "@/utils/api";
import SortIcon from "@/icons/SortIcon";
import DocIcon from "@/icons/docIcon";
import QuoteIcon from "@/icons/quoteIcon";
import LineChart from "@/components/linechart";
import SubjectChart from "@/components/subjectchart";
import PubTypeChart from "@/components/pubTypeChart";
import SubTypeChart from "@/components/typechart";
import PersonIcon from "@/icons/personIcon";
import AuthorList from "@/components/authorList";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import {
	deptprojectfund,
	deptwisephds,
	getAuthors,
	getAuthorsByDept,
	getDepartment,
	getDepartmentMetrics,
	getDepartmentPubChart,
	getDepartmentSocialMetrics,
	getDepartmentSubjectChart,
	getDepartmentSubtypeChart,
	getDepartmentWorldChart,
	getDepartmentYearlyChart,
	getMetrics,
} from "@/utils/mongo";
import CoauthorMap from "@/components/CoauthorMap";
import TimePicker from "@/components/TimeRange";
import SocialCard from "@/components/socialCard";
import XIcon from "@/icons/X";
import FBIcon from "@/icons/FB";
import StatCard from "@/components/statCard";
import Icon from "@/icons/Icon";
import ScopusIcon from "@/icons/Scopus";
import CrossRefIcon from "@/icons/Crossref";
import CalendarMonth from "@/icons/CalendarMonth";
import VerifiedIcon from "@/icons/VerifiedIcon";
import PauseIcon from "@/icons/PauseIcon";
import StackIcon from "@/icons/StackIcon";
import Fund_icon from "@/icons/Fund_icon";
import Phd_icon from "@/icons/Phd_icons";
import Link from "next/link";


// const id = "55940987100";

export default async function DepartmentView({ params = { dept: "" }, searchParams = { page: 1 }  }) {
	const dept = decodeURIComponent(params.dept);
	
	if (!dept) {
		throw "No ID given!";
	}
	let page = parseInt(searchParams.page) || 1;
	if (page < 1) {
		throw "Invalid page number!";
	}
	const data = await getDepartment(dept, searchParams);
	const authors = await getAuthors({...searchParams, ...(dept != "pu" && {depts: dept})});
	const metrics = await getMetrics({dept}, searchParams);
	const subtypeChart = await getDepartmentSubtypeChart(dept, searchParams);
	const subjectChart = await getDepartmentSubjectChart(dept, searchParams);
	const yearlyChart = await getDepartmentYearlyChart(dept, searchParams);
	const pubChart = await getDepartmentPubChart(dept, searchParams);
	const world = await getDepartmentWorldChart(dept, searchParams);
	
	const totalFund= await deptprojectfund(dept);
	
	const totalPhds=await deptwisephds(dept)

	const { TWEET_COUNT, FACEBOOK_COUNT } = await getDepartmentSocialMetrics(dept, searchParams);
	let years = yearlyChart.map((y) => y.x);
	let impact = pubChart.reduce((p, t) => p + ((parseInt(t.metrics?.impactFactorData?.metrics?.impactMetrics?.jif) || 0) * t.value), 0);
	
	return (
		<>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
				stat={metrics.hIndex}
				statTitle={"H-Index"}
				rank={data.rank?.hIndex}
				showRankings={!(searchParams.from && searchParams.to)}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.gIndex}
				statTitle={"G-Index"}
				rank={data.rank?.hIndex}
				showRankings={!(searchParams.from && searchParams.to)}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.i10Index}
				statTitle={"I-10 Index"}
				rank={data.rank?.i10Index}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
				stat={impact}
				statTitle={"Total Impact Factor"}
				rank={data.rank?.hIndex}
				showRankings={!(searchParams.from && searchParams.to)}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
				stat={metrics.citationCount}
				statTitle={"Citations"}
				rank={data.rank?.citations}
				icon={<ScopusIcon width={108} height={48} />}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.docCount}
				statTitle={"Documents"}
				rank={data.rank?.docs}
				icon={
					<Icon>
						<DocIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.fundedCount}
				statTitle={"Funded Documents"}
				rank={data.rank?.docs}
				icon={
					<Icon>
						<DocIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.crossrefCitations}
				statTitle={"Citations"}
				rank={data.rank?.citations}
				icon={<CrossRefIcon width={108} height={48} />}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			{/* <StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.projects.planned}
				statTitle={"Planned Projects"}
				rank={data.rank?.project}
				icon={
					<Icon>
						<CalendarMonth />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/> */}
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.projects.ongoing}
				statTitle={"Ongoing Projects"}
				rank={data.rank?.project}
				icon={
					<Icon>
						<StackIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.projects.completed}
				statTitle={"Completed Projects"}
				rank={data.rank?.project}
				icon={
					<Icon>
						<VerifiedIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
           
		    {/* <StatCard
            className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
			statTitle={"Research Funds"}
			stat={totalFund}
			inLakh={totalFund > 1 ? "Lakhs" :"Lakh"}
			icon={<Fund_icon width={48} height={48} />}
			/> */}
            
			<SocialCard
						className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
						stat={totalFund}
						statTitle={"Research Funds"}
						statDesc="Research funds generated"
						Icon={<Fund_icon width={48} height={48}  />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
             <SocialCard
						className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
						stat={totalPhds}
						statTitle={"PhDs"}
						statDesc="No. of Phds awarded"
						Icon={<Phd_icon width={48} height={48}  />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>

			{/* <StatCard
				className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch"
				stat={metrics.projects.stalled}
				statTitle={"Stalled Projects"}
				rank={data.rank?.project}
				icon={
					<Icon>
						<PauseIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/> */}
			<div className="grid-12 col-span-12">
				{TWEET_COUNT != 0 && (
					<SocialCard
						className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
						stat={TWEET_COUNT}
						statTitle={"Twitter"}
						statDesc="Tweets and Retweets"
						Icon={<XIcon />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
				)}
				{FACEBOOK_COUNT != 0 && (
					<SocialCard
						className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[120px]"
						stat={FACEBOOK_COUNT}
						statTitle={"Facebook"}
						statDesc="Shares, Likes & Comments"
						Icon={<FBIcon />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
				)}
			</div>
			<Card className="col-span-12">
				<CardContent>
					<h2>Documents per Year</h2>
					<div className="h-96">
						<LineChart data={yearlyChart} />
					</div>
				</CardContent>
			</Card>
			<Card className="col-span-12">
				<CardContent>
					<h2>Global Collaborations</h2>
					<div style={{ height: "450px" }}>
						<CoauthorMap data={world} link={`/dept/${dept}/documents`} />
					</div>
				</CardContent>
			</Card>
			<SubjectChart baseURL={`/dept/${dept}/documents`} data={subjectChart} classType="col-span-4" classChart="col-span-8" />
			<PubTypeChart baseURL={`/dept/${dept}/documents`} data={pubChart} classType="col-span-4" classChart="col-span-8" />
			<SubTypeChart baseURL={`/dept/${dept}/documents`} data={subtypeChart} classType="col-span-4" classChart="col-span-8" />
			<div className="col-span-4">
				<StatCard
					className="mb-4"
					stat={metrics.citationCount}
					statTitle={"Total Citations"}
					rank={data.rank?.citations}
					icon={
						<Icon>
							<QuoteIcon />
						</Icon>
					}
					showRankings={!(searchParams.from && searchParams.to)}
				/>
				<StatCard
					className="mb-4"
					stat={data.authorCount}
					statTitle={"Authors"}
					rank={data.rank?.authorCount}
					icon={
						<Icon>
							<PersonIcon />
						</Icon>
					}
					showRankings={!(searchParams.from && searchParams.to)}
				/>
				<StatCard
					stat={data.averageDocs}
					statTitle={"Documents per Author"}
					rank={data.rank?.averageDocs}
					icon={
						<Icon>
							<DocIcon />
						</Icon>
					}
					showRankings={!(searchParams.from && searchParams.to)}
				/>
			</div>
			<AuthorList
				fixedHeight
				// viewAll
				// viewAllLink={/dept/${dept}/authors}
				page={page}
				pageSize={25}
				authCount={authors.count}
				data={authors.results}
				className="col-span-8 row-span-3"
			/>
			<PageSelect page={page} itemCount={data.authorCount} />
		</>
	);
}

async function PageSelect({ page = 1, itemCount, pageSize = 25 }) {
	let max = Math.ceil(itemCount / pageSize);
	return (
		<div className="col-span-8 col-start-5 flex flex-row justify-between items-center">
			{page === 1 ? (
				<div className="card block px-4 py-2 relative rounded-md text-slate-600 bg-slate-200">Prev</div>
			) : (
				<Link
					href={{ href: ".", query: { page: page - 1 } }}
					className="card block px-4 py-2 relative rounded-md shadow-md"
				>
					Prev
				</Link>
			)}
			<div className="card flex items-center justify-center w-12 h-12 text-center text-xl relative rounded-lg shadow-md ">
				{page}
			</div>
			{page === max ? (
				<div className="card block px-4 py-2 relative rounded-md text-slate-600 bg-slate-200">Next</div>
			) : (
				<Link
					href={{ href: ".", query: { page: page + 1 } }}
					className="card block px-4 py-2 relative rounded-md shadow-md"
				>
					Next
				</Link>
			)}
		</div>
	);
}

