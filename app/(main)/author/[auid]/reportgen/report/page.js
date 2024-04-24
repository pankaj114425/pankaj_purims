import api from "@/utils/api";
import Link from "next/link";
import StatCard from "@/components/statCard";
import SortIcon from "@/icons/SortIcon";
import DocIcon from "@/icons/docIcon";
import QuoteIcon from "@/icons/quoteIcon";
import SubjectChart from "@/components/subjectchart";
import PubTypeChart from "@/components/pubTypeChart";
import SubTypeChart from "@/components/typechart";
import LineChart from "@/components/linechart";
import DocumentList from "@/components/documentList";
import PersonIcon from "@/icons/personIcon";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import CoauthorMap from "@/components/CoauthorMap";
import SocialCard from "@/components/socialCard";
import FBIcon from "@/icons/FB";
import XIcon from "@/icons/X";
import CrossRefIcon from "@/icons/Crossref";
import Icon from "@/icons/Icon";
import ScopusIcon from "@/icons/Scopus";
import {
	authorwisephds,
	deptprojectfund,
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
	fetchUserProject
} from "@/utils/mongo";
import TimePicker from "@/components/TimeRange";
import alpha3 from "@/utils/alpha3";
import Coauthors from "../../Coauthors";
import Research_icon from "@/icons/Research_icon";
import Phd_icon from "@/icons/Phd_icons";

// const id = "55940987100";
let dateFormatter = new Intl.DateTimeFormat("en-IN", { dateStyle: "long", timeZone: "UTC" });
export default async function AuthorView({ params = { auid: "" }, searchParams }) {
	const { auid } = params;
	if (!auid) {
		throw "No ID given!";
	}
	const authData = await getAuthor(auid);
	const data = await getDocs({
		authors: auid,
		from: searchParams.from,
		to: searchParams.to,
	});
	const authorMetrics = await getMetrics({ auid }, { from: searchParams.from, to: searchParams.to });
	const subtypeChart = await getAuthorSubtypeChart(auid, { from: searchParams.from, to: searchParams.to });
	const yearlyChart = await getAuthorYearlyChart(auid, { from: searchParams.from, to: searchParams.to });
	const subjectChart = await getAuthorSubjectChart(auid, { from: searchParams.from, to: searchParams.to });
	const pubChart = await getAuthorPubChart(auid, { from: searchParams.from, to: searchParams.to });
	const world = await getAuthorWorldChart(auid, { from: searchParams.from, to: searchParams.to });
	const coData = await getCoauthors(auid, { from: searchParams.from, to: searchParams.to });
	const { firstCount, lastCount, correspondingCount } = await getAuthorPositions(auid, searchParams);
	const { TWEET_COUNT, FACEBOOK_COUNT } = await getAuthorSocialMetrics(auid, searchParams);

	const {result,count}=await fetchUserProject(auid);
	let projectFund=0;
	result.forEach(item=>{
	  projectFund+=item.amount_allocated;
	})
	
	const totalphds=  await authorwisephds (authData.profile.firstName,authData.profile.lastName,authData.dept)
	

	let years = yearlyChart.map((y) => y.x);
	let authorName = `${authData.profile.lastName}${authData.profile.lastName && ", "}${authData.profile.firstName} ${
		authData.profile.middleName || ""
	}`;
	return (
		<>
			<div className="col-span-12 my-6 px-8 text-5xl">
				{authorName} published 
				<span className="gradient-text ml-1">{authorMetrics.docCount} documents</span> between{" "}
				{dateFormatter.format(new Date(searchParams.from))} and{" "}
				{dateFormatter.format(new Date(searchParams.to))}
				{authorMetrics.fundedCount && (
					<>
						, out of which <br />
						<span className="gradient-text ml-1">{authorMetrics.fundedCount} documents were funded. </span>
					</>
				)}
			</div>
			<StatCard
				className="col-span-3 self-stretch h-[120px]"
				stat={authorMetrics.hIndex}
				statTitle={"H-Index"}
				dept={authData.dept}
				deptRank={authData.deptRank.hIndex}
				rank={authData.rank.hIndex}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.gIndex}
				statTitle={"G-Index"}
				dept={authData.dept}
				deptRank={authData.deptRank.hIndex}
				rank={authData.rank.hIndex}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.i10Index}
				statTitle={"I-10 Index"}
				dept={authData.dept}
				deptRank={authData.deptRank.i10Index}
				rank={authData.rank.i10Index}
				icon={
					<Icon>
						<SortIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.docCount}
				statTitle={"Documents"}
				dept={authData.dept}
				deptRank={authData.deptRank.docs}
				rank={authData.rank.docs}
				icon={
					<Icon>
						<DocIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.citationCount}
				statTitle={<span>Citations</span>}
				dept={authData.dept}
				deptRank={authData.deptRank.citations}
				rank={authData.rank.citations}
				icon={<ScopusIcon width={128} height={48} />}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.fundedCount}
				statTitle={<span style={{overflow: "hidden",textOverflow: "ellipsis",whiteSpace: "nowrap"}}>Funded Documents</span>}
				dept={authData.dept}
				deptRank={authData.deptRank.citations}
				rank={authData.rank.citations}
				icon={
					<Icon>
						<DocIcon />
					</Icon>
				}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
			<StatCard
				className="col-span-3 self-stretch"
				stat={authorMetrics.crossrefCitations}
				statTitle={<span>Citations</span>}
				dept={authData.dept}
				deptRank={authData.deptRank.citations}
				rank={authData.rank.citations}
				icon={<CrossRefIcon width={150} height={48} />}
				showRankings={!(searchParams.from && searchParams.to)}
			/>
             
			 <SocialCard
						className="col-span-3 self-stretch"
						stat={count}
						statTitle={"Research Projects"}
						Icon={<Research_icon />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
			   <SocialCard
						className="col-span-3 self-stretch"
						stat={projectFund}
						statTitle={"Research Funds"}
						statDesc="Research funds generated"
						Icon={<research_fund />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
			  <SocialCard
						className="col-span-3 self-stretch"
						stat={totalphds}
						statTitle={"PhDs"}
						statDesc="No. of PhDs awarded"
						Icon={<Phd_icon/>}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
			 

			{/* <div className="grid-12 col-span-12"> */}
				{TWEET_COUNT > 0 && (
					<SocialCard
						className="col-span-3 self-stretch"
						stat={TWEET_COUNT}
						statTitle={"Twitter"}
						statDesc="Tweets and Retweets"
						Icon={<XIcon />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
				)}
				{FACEBOOK_COUNT > 0 && (
					<SocialCard
						className="col-span-3 self-stretch"
						stat={FACEBOOK_COUNT}
						statTitle={"Facebook"}
						statDesc="Shares, Likes & Comments"
						Icon={<FBIcon />}
						showRankings={!(searchParams.from && searchParams.to)}
					/>
				)}
			{/* </div> */}
			<Coauthors addQ={false} baseURL={`/author/${auid}/documents?from=${searchParams.from}&to=${searchParams.to}&nodate=true`} data={coData} worldData={world} className="col-span-4" />
			<SubjectChart
				baseURL={`/author/${auid}/documents`}
				data={subjectChart}
				classType="col-span-4"
				classChart="col-span-8"
			/>
			<PubTypeChart
				baseURL={`/author/${auid}/documents`}
				data={pubChart}
				classType="col-span-4"
				classChart="col-span-8"
			/>
			<SubTypeChart
				baseURL={`/author/${auid}/documents`}
				data={subtypeChart}
				classType="col-span-4"
				classChart="col-span-8"
			/>
			<Card className="col-span-12">
				<CardContent>
					<h2>Documents per Year</h2>
					<div style={{ height: "450px" }}>
						<LineChart data={yearlyChart} />
					</div>
				</CardContent>
			</Card>
			<AuthPosition
				data={authData}
				firstCount={firstCount}
				lastCount={lastCount}
				totalCount={authorMetrics.docCount}
				correspondingCount={correspondingCount}
				className="sm:sticky top-20 col-span-4"
			/>
			<DocumentList
				fixedHeight
				viewAll={authData.docCount > 25}
				viewAllLink={`/author/${auid}/documents?from=${searchParams.from}&to=${searchParams.to}&nodate=true`}
				docsCount={authData.docCount}
				data={data}
				className="col-span-8"
			/>
		</>
	);
}

async function AuthPosition({ data, firstCount, lastCount, totalCount, correspondingCount, ...props }) {
	return (
		<Card {...props}>
			<CardContent>
				<div className="text-3xl pb-4 border-b-2 border-slate-300">
					{correspondingCount} Documents
					<div className="text-base">As Correspondence Author</div>
				</div>
				<div className="text-3xl py-4 border-b-2 border-slate-300">
					{firstCount} Documents
					<div className="text-base">As First Author</div>
				</div>
				<div className="text-3xl py-4 border-b-2 border-slate-300">
					{totalCount - (firstCount + lastCount)} Documents
					<div className="text-base">As Coauthor</div>
				</div>
				<div className="text-3xl pt-4">
					{lastCount} Documents
					<div className="text-base">As Last Author</div>
				</div>
				{/* <div className="text-3xl pt-4">
					{data.openAccessCount} Documents
					<div className="text-base">Open Access</div>
				</div> */}
			</CardContent>
		</Card>
	);
}