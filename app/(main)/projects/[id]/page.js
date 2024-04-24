import { getOneProject } from "@/utils/mongo"
import StatCard from "../../StatCard";
import SortIcon from "@/icons/SortIcon";
import AcademicIcon from "@/icons/AcademicIcon";
import Icon from "@/icons/Icon";
import Card from "@/components/UI/Card";
import CardContent from "@/components/UI/CardContent";
import Link from "next/link";

export default async function ({ params }) {
    const { id } = params;
    const project = await getOneProject(id);
    const getMonths=()=>{
        if(project && project.from && project.to){
            const date1=new Date(project.from);
            const date2=new Date(project.to);
            if(date1<date2){
                return date2.getMonth()-date1.getMonth()+(12*(date2.getFullYear()-date1.getFullYear()));
            }else{
                return "NA";
            }
        }else{
            return "NA";
        }
    }
    return (
        <main id="main" className="grid-12 max-w-7xl mx-auto mt-6">
            <div className="col-span-12">
                <Card >
                    <CardContent>
                        <div className="text-sm">
                            {project.status === "ongoing" && "Ongoing"}
                            {project.status === "completed" && "Completed"}
                            {(project.amount_allocated && project.amount_received) && " • Funded"}
                        </div>
                        <h1 className="text-3xl serif mt-2">{project.title}</h1>
                        <div style={{ display: "flex", overflow: "hidden", flexWrap: "wrap" }}>
                            {(project.principal_name && project.principal_scopusID) &&
                                <Link href={`/author/${project.principal_scopusID}`} className="author-link pr-2">
                                    {project.principal_name};
                                </Link>
                            }
                            {project.copis && project.copis.map(item => {
                                return (
                                    <div>
                                        {item.scopusID && <Link href={`/author/${item.scopusID}`} className="author-link pr-2">
                                            {item.name};
                                        </Link>}
                                        {!(item.scopusID) && <p className="pr-2">
                                            {item.name};
                                        </p>}
                                    </div>
                                );
                            })}
                        </div>
                        <div className="mt-1">{project.from} to {project.to}</div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-4 row-span-2">
                <Card className="mb-4">
                    <CardContent>
                        <h3>Duration: </h3>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            <div className="flex-1">From: </div>
                            <div className="px-2">{project.from}</div>
                        </div>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            <div className="flex-1">To: </div>
                            <div className="px-2">{project.to}</div>
                        </div>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            <div className="flex-1">Total: </div>
                            <div className="px-2">{getMonths()} Months</div>
                        </div>
                    </CardContent>
                </Card>
                <StatCard
                    className="xl:col-span-4 md:col-span-4 col-span-6 self-stretch"
                    stat={project.amount_allocated}
                    statTitle={"Amount Allocated"}
                    icon={
                        <Icon>
                            <SortIcon />
                        </Icon>
                    }
                />
                <StatCard
                    className="xl:col-span-4 md:col-span-4 mt-4 col-span-6 self-stretch"
                    stat={project.amount_received}
                    statTitle={"Amount Received"}
                    icon={
                        <Icon>
                            <SortIcon />
                        </Icon>
                    }
                />
                <Card className="mb-4 mt-4">
                    <CardContent>
                        <h3>Installment</h3>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            {project.funding_agency && <div className="px-2">{project.installment}</div>}
                            {!project.funding_agency && <div className="px-2">NA</div>}
                        </div>
                    </CardContent>
                </Card>
                <Card className="mb-4 mt-4">
                    <CardContent>
                        <h3>Funders</h3>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            {project.funding_agency && <div className="px-2">{project.funding_agency}</div>}
                            {!project.funding_agency && <div className="px-2">NA</div>}
                        </div>
                    </CardContent>
                </Card>
                {project.industry_partner && <Card className="mb-4 mt-4">
                    <CardContent>
                        <h3>Industry Partner</h3>
                        <div className="text-lg flex flex-row items-center justify-between py-2 border-divider">
                            {project.industry_partner && <div className="px-2">{project.industry_partner}</div>}
                            {!project.industry_partner && <div className="px-2">NA</div>}
                        </div>
                    </CardContent>
                </Card>}
            </div>
            <div className="col-span-8 self-stretch">
                <Card className="xl:col-span-4 md:col-span-4 col-span-6 self-stretch">
                    <CardContent>
                        <h2>Description</h2>
                        <div className="font-serif text-justify py-3 border-divider">
                            {project.description != "" ? project.description : "No description found."}
                        </div>
                    </CardContent>
                </Card>
                <Card className="mt-5 xl:col-span-4 md:col-span-4 col-span-6 self-stretch">
                    <CardContent>
                        <h2>Deliverables</h2>
                        <div className="font-serif text-justify py-3 border-divider">
                            {project.deliverables != "" ? project.deliverables : "No deliverables found."}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </main>
    )
}