import Link from "next/link";
import Card from "@/components/UI/Card";
import CrossRefIcon from "@/icons/Crossref";
import Icon from "@/icons/Icon";
import DocIcon from "@/icons/docIcon";
import ScopusIcon from "@/icons/Scopus";
import SortIcon from "@/icons/SortIcon";
import CardContent from "@/components/UI/CardContent";
import SubjectChart from "@/components/subjectchart";
import LineChart from "@/components/linechart";
import Research_icon from "@/icons/Research_icon";
import Fund_icon from "@/icons/Fund_icon";
import Phd_icon from "@/icons/Phd_icons";
import {
  getDepartmentPubChart,
  getDepartmentSocialMetrics,
  getDepartmentSubjectChart,
  getDepartmentSubtypeChart,
  getDepartmentWorldChart,
  getDepartmentYearlyChart,
  getDepts,
  getMetrics,
  univphds,
  univprojects,
  univprojectfund,
} from "@/utils/mongo";
import StatCard from "./StatCard";
// import PubTypeChart from "@/components/pubTypeChart";
// import SubTypeChart from "@/components/typechart";
import Globe3D from "@/components/Globe3D";
import XIcon from "@/icons/X";

export default async function Home() {
  let data = await getDepts();
  data = data?.filter((d) => d._id != "pu");
  // const subjectChart = await getDepartmentSubjectChart("pu");
  const yearlyChart = await getDepartmentYearlyChart("pu");
  const pubChart = await getDepartmentPubChart("pu");
  // const subtypeChart = await getDepartmentSubtypeChart("pu");
  const world = await getDepartmentWorldChart("pu");
  const metrics = await getMetrics({ dept: "pu" });
  const totalProjectFund = await univprojectfund();
  const totalPhds = await univphds();
  const totalProjects = await univprojects();

  const { TWEET_COUNT } = await getDepartmentSocialMetrics("pu");
  let impact = pubChart.reduce(
    (p, t) =>
      p +
      (parseInt(t.metrics?.impactFactorData?.metrics?.impactMetrics?.jif) ||
        0) *
        t.value,
    0
  );

  return (
    <div id="home-main" className="dark">
      <div id="home-top" className="text-center">
        <div id="home-top-front" className="relative p-2">
          <h1 className="home-title flex justify-center items-center">
            <img
              src="/Panjab_University_logo.png"
              className="h-32 mr-4"
              alt="PU Logo"
            />
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "start",
              }}
            >
              <p className="gradient-text">PU RIMS</p>
              <p
                className="gradient-text"
                style={{
                  fontSize: "14px",
                  marginTop: "8px",
                  letterSpacing: "1px",
                }}
              >
                beta
              </p>
            </div>
          </h1>
          <div className="mb-6 big-text">
            Panjab University Research Information Management System
          </div>
          <div className="big-text">Research under one umbrella</div>
          <div className="mt-10 big-text">
            <span className="gradient-text">PU RIMS</span> collects and displays
            data from multiple reputable sources.
          </div>
          <div className="text-center mt-10 flex flex-row flex-wrap gap-6">
            <Link className="big-button" href={"/dept/pu"}>
              View Overall Stats
            </Link>
            <Link className="big-button teal" href={"/dept"}>
              View Faculties
            </Link>
          </div>
        </div>
      </div>
      <div className="text-center my-8 fade-scroll">
        <div className="mb-1 huge-text">Research under one umbrella</div>
        <div className="max-w-xl big-text mx-auto">
          All the research data, gathered at a single hub.
        </div>
      </div>
      <div className="grid-12 mx-auto max-w-6xl p-4">
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.hIndex}
          statTitle={"H-Index"}
          icon={
            <Icon>
              <SortIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.gIndex}
          statTitle={"G-Index"}
          icon={
            <Icon>
              <SortIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.i10Index}
          statTitle={"I-10 Index"}
          icon={
            <Icon>
              <SortIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.docCount}
          statTitle={"Documents"}
          icon={
            <Icon>
              <DocIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={impact}
          statTitle={"Total Impact Factor"}
          icon={
            <Icon>
              <SortIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.fundedCount}
          statTitle={<span>Funded Documents</span>}
          icon={
            <Icon>
              <DocIcon />
            </Icon>
          }
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.citationCount}
          statTitle={<span>Citations</span>}
          statDesc={"On Scopus"}
          icon={<ScopusIcon width={128} height={48} />}
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={TWEET_COUNT}
          statTitle={"Twitter"}
          statDesc="Tweets and Retweets"
          icon={<XIcon />}
          iconClass=""
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={metrics.crossrefCitations}
          statTitle={<span>Citations</span>}
          statDesc={"On CrossRef"}
          icon={<CrossRefIcon width={150} height={48} />}
        />

        <StatCard
          className="col-span-4 self-stretch"
          stat={totalProjects}
          statTitle={"Research Projects "}
          statDesc="All research project granted"
          icon={<Research_icon />}
          iconClass=""
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={totalProjectFund}
          statTitle={"Research Funds"}
          statDesc=" Total Research funds generated"
          icon={<Fund_icon />}
          iconClass=""
        />
        <StatCard
          className="col-span-4 self-stretch"
          stat={totalPhds}
          statTitle={"Phds"}
          statDesc="Number of Phds awarded"
          icon={<Phd_icon />}
          iconClass=""
        />
            
      </div>
      <div className="grid-12 p-4 mx-auto max-w-7xl">
        <div className="col-span-12 text-center my-8 fade-scroll">
          <div className="mb-1 huge-text">Contributing, since 1882</div>
          <div className="max-w-2xl big-text mx-auto">
            Established in 1882 as University of Punjab at Lahore (now in
            Pakistan), Panjab University is one of the oldest universities in
            India.
          </div>
        </div>
        <Card className="col-span-12 fade-scroll w-full line-chart-scroller">
          <CardContent className="p-2">
            <div className="line-chart-container" style={{ height: "450px" }}>
              <LineChart data={yearlyChart} />
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="z-20 relative">
        <div id="t-to-b" />
        <div id="globe-main">
          <div id="globetitle" className="fade-scroll z-30 relative">
            Global Collaborations
          </div>
          <Globe3D data={world} />
        </div>
        <div id="b-to-t" />
      </div>
      {/* <div className="grid-12 p-4 mx-auto max-w-7xl">
        <div className="col-span-12 text-center mb-8 mt-32 fade-scroll">
          <div className="mb-1 huge-text">
            Features among prestigious journals
          </div>
          <div className="max-w-3xl big-text mx-auto">
            Work done by Panjab University's researchers have been featured in
            numerous prestigious journals, such as{" "}
            <span className="highlighted-text"><Link href={"/document/?page=1&sort=coverDate&order=descending&pub=21206"}>Nature</Link></span>,{" "}
            <span className="highlighted-text">
              <Link href={"/document/?page=1&sort=coverDate&order=descending&pub=23340"}>
                                Chemical Reviews
              </Link>
            </span>{" "}
            and <span className="highlighted-text"><Link href={"/document/?page=1&sort=coverDate&order=descending&pub=20699"}>Science</Link></span>.
          </div>
        </div>
        <PubTypeChart
          baseURL={`/document`}
          data={pubChart}
          classType="col-span-4 fade-side-right"
          classChart="col-span-8 fade-side-left bg-transparent"
        />
        <SubTypeChart
          baseURL={`/document`}
          data={subtypeChart}
          classType="col-span-4 fade-side-left"
          classChart="col-span-8 fade-side-right"
        />
        <div className="col-span-12 text-center mb-8 mt-32 fade-scroll">
          <div className="mb-1 huge-text">Diverse fields of research</div>
          <div className="max-w-xl big-text mx-auto">
            Panjab University has contributed in various fields of research, and
            is one of the leading institution for research in India.
          </div>
        </div>
        <SubjectChart
          baseURL={`/document`}
          data={subjectChart}
          classType="col-span-4 fade-side-left"
          classChart="col-span-8 fade-side-right"
        />
      </div> */}
      <div className="text-center mb-8 mt-32 fade-scroll">
        <div className="mb-1 huge-text">Department for everyone</div>
        <div className="max-w-2xl big-text mx-auto">
          The Panjab University Campus at Chandigarh accommodates{" "}
          <span className="highlighted-text">74</span> teaching and research
          departments/institutes/centres besides{" "}
          <span className="highlighted-text">6</span> independent Chairs for
          research.
        </div>
      </div>
      <div className="p-4 grid-12 mx-auto max-w-screen-2xl">
        {data.slice(0, 6).map((a, i) => (
          <Card
            className={`col-span-6 p-4 h-full fade-side-${
              i % 2 === 0 ? "left" : "right"
            }`}
            key={i}
          >
            <Link
              href={`/dept/${a._id}`}
              className="h-full flex flex-col w-full"
            >
              <h2 className="text-xl grow">{a.name}</h2>
              <div className="flex flex-row w-full items-center justify-between pr-3">
                <div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
                  {a.citationCount}
                  <div className="text-sm sans-serif font-semibold">
                    Citations
                  </div>
                </div>
                <div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
                  {a.authorCount}
                  <div className="text-sm sans-serif font-semibold">
                    Authors
                  </div>
                </div>
                <div className="text-3xl font-mono font-bold pl-2 border-l-4 border-blue-600">
                  {a.hIndex}
                  <div className="text-sm sans-serif font-semibold">
                    H-Index
                  </div>
                </div>
                <div className="text-3xl font-mono font-bold pl-2 pr-8 border-l-4 border-blue-600">
                  {a.i10Index}
                  <div className="text-sm sans-serif font-semibold">
                    I-10 Index
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        ))}
        <div className="text-center col-span-12 mt-6 fade-scroll">
          <Link className="big-button" href={"/dept"}>
            View All
          </Link>
        </div>
      </div>
      <footer className="h-60 w-full" />
    </div>
  );
}
