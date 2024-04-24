import api from "@/utils/api";
import Link from "next/link";
import StatCard  from "@/components/statCard";

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
  fetchUserProject,
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
import Coauthors from "./Coauthors";
// import SocialCardAuthor from "@/components/SocialCardAuthor";
import Fund_icon from "@/icons/Fund_icon";
import Research_icon from "@/icons/Research_icon";
import Phd_icon from "@/icons/Phd_icons";

// const id = "55940987100";

export default async function AuthorView({
  params = { auid: "" },
  searchParams,
}) {
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
  
  const totalphds=  await authorwisephds (authData.profile.firstName,authData.profile.lastName,authData.dept)
  
  const authorMetrics = await getMetrics(
    { auid },
    { from: searchParams.from, to: searchParams.to }
  );
  const subtypeChart = await getAuthorSubtypeChart(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const yearlyChart = await getAuthorYearlyChart(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const subjectChart = await getAuthorSubjectChart(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const pubChart = await getAuthorPubChart(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const world = await getAuthorWorldChart(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const coData = await getCoauthors(auid, {
    from: searchParams.from,
    to: searchParams.to,
  });
  const { firstCount, lastCount, correspondingCount } =
    await getAuthorPositions(auid, searchParams);
  const { TWEET_COUNT, FACEBOOK_COUNT } = await getAuthorSocialMetrics(
    auid,
    searchParams
  );
  let years = yearlyChart.map((y) => y.x);
  let impact = pubChart.reduce(
    (p, t) =>
      p +
      (parseInt(t.metrics?.impactFactorData?.metrics?.impactMetrics?.jif) ||
        0) *
        t.value,
    0
  );
  const {result,count}=await fetchUserProject(auid);
  let projectFund=0;
  result.forEach(item=>{
    projectFund+=item.amount_allocated;
  })
  return (
    <>
      <StatCard
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
        stat={impact}
        statTitle={"Total Impact Factor"}
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
        stat={authorMetrics.citationCount}
        statTitle={"Citations"}
        dept={authData.dept}
        deptRank={authData.deptRank.citations}
        rank={authData.rank.citations}
        icon={<ScopusIcon width={128} height={48} />}
        showRankings={!(searchParams.from && searchParams.to)}
      />
      <StatCard
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
        stat={authorMetrics.fundedCount}
        statTitle={"Funded Documents"}
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
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
        stat={authorMetrics.crossrefCitations}
        statTitle={"Citations"}
        dept={authData.dept}
        deptRank={authData.deptRank.citations}
        rank={authData.rank.citations}
        icon={<CrossRefIcon width={150} height={48} />}
        showRankings={!(searchParams.from && searchParams.to)}
      />
      {/* <StatCard
        className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
        stat={authorMetrics.crossrefCitations}
        statTitle={"Research Projects"}
        // dept={authData.dept}
        // deptRank={authData.deptRank.citations}
        // rank={authData.rank.citations}
        icon={<Research_icon width={48} height={48} />}
        showRankings={!(searchParams.from && searchParams.to)}
      /> */}
      <SocialCard
          Icon={<Research_icon width={48} height={48}/>}
          className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
          stat={count}
          statTitle="Research Projects"
          statDesc="All research project granted"
          margin="mt-4"
        />
      {/* <StatCard
        className="xl:col-span-3 md:col-span-4 col-span-6  h-[148px]"
        stat={totalFund}
        statTitle={"total Research Funds"}
        dept={authData.dept}
        icon={<Fund_icon width={48} height={48} />}
        showRankings={!(searchParams.from && searchParams.to)}
      /> */}
      <SocialCard
          Icon={<Fund_icon width={48} height={48} />}
          className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
          stat={projectFund}
          statTitle="Research Funds"
          statDesc="Research funds generated"
          margin="mt-4"
        />
{/* 
      <StatCard
        className="xl:col-span-3 md:col-span-4 col-span-6 h-[148px]"
        stat={totalphds}
        statTitle={"No. of Phds awarded"}
        icon={<Phd_icon width={48} height={48} />}
        showRankings={!(searchParams.from && searchParams.to)}
      /> */}
      <SocialCard
          Icon={<Phd_icon width={48} height={48} />}
          className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
          stat={totalphds}
          statTitle="Phds"
          statDesc="No. of Phds awarded"
          margin="mt-4"
        />

      {TWEET_COUNT > 0 && (
        <SocialCard
          Icon={<XIcon />}
          className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
          stat={TWEET_COUNT}
          statTitle="Twitter"
          statDesc="Tweets, Retweets"
          margin="mt-4"
        />
      )}
	  
	  {FACEBOOK_COUNT > 0 && (
        <SocialCard
          Icon={<FBIcon />}
          className="xl:col-span-3 md:col-span-4 col-span-6 self-stretch h-[148px]"
          stat={FACEBOOK_COUNT}
          statTitle="Facebook"
          statDesc="Shares, Likes & Comments"
          margin="mt-4"
        />
      )}
	  
      
	  <Coauthors
        baseURL={`/author/${auid}/documents`}
        data={coData}
        worldData={world}
        className="col-span-4"
      />
	
      
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
        viewAllLink={`/author/${auid}/documents`}
        docsCount={authData.docCount}
        data={data}
        className="col-span-8"
      />
    </>
  );
}

async function AuthPosition({
  data,
  firstCount,
  lastCount,
  totalCount,
  correspondingCount,
  ...props
}) {
  return (
    <Card {...props}>
      <CardContent>
        <div className="text-3xl pb-4 border-b-2 border-slate-300">
          {correspondingCount} Documents
          <div className="text-base">As Corresponding Author</div>
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