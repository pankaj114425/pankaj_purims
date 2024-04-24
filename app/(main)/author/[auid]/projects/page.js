import { checkNewUser, fetchUserProject, getProjects_notUser } from "@/utils/mongo";
import CardContent from "@/components/UI/CardContent";
import Card from "@/components/UI/Card";
import Link from "next/link";
import DeleteButton from "./DeleteButton";
import { auth } from "@/app/auth";
import NewUser from "./NewUser";

export default async function ProjectPage({ params }) {
    const { auid } = params;
    const project = await fetchUserProject(auid);
    const session=await auth();
    let newUser="";
    if(session?.role==="Author" && session?.scopusID){
        newUser=await checkNewUser(auid);
    }else{
        newUser=false;
    }
    const otherProject = await getProjects_notUser(auid);
    const { result, count } = project;
    console.log(newUser);
    return (
        <main className="grid-12 max-w-7xl w-screen mx-auto ">
            {(newUser && session?.role==="Author" && session?.scopusID===auid) && <NewUser session={session} newUser={newUser} otherProject={otherProject} ></NewUser>}
            {!(newUser) && <div className="col-span-12 self-stretch me-8">
                <CardContent>
                    <div style={{display:"flex",justifyContent: "space-between",alignItems:"center"}}>
                        <h2>
                            {project && count == 0
                                ? "Projects: No Projects Found!"
                                : `Projects: ${count} available`}
                        </h2>
                        <h2>
                            {(session && session.user.email && session.scopusID && session.scopusID===auid && session.role==="Author") && <Link href={`add`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                                </svg>
                            </Link>}
                            {(session && session.user.email && (session.role==="Admin" || session.role==="Super_Admin")) && <Link href={`add`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-file-earmark-plus" viewBox="0 0 16 16">
                                    <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5"/>
                                    <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/>
                                </svg>
                            </Link>}
                        </h2>     
                    </div>
                </CardContent>
                {result &&
                    result.map((project, i) => (
                        <Card key={i} className="my-5">
                            <CardContent className="flex flex-row p-2 py-4">
                                <div className="flex-1">
                                    <div className="border-l-4 pl-3">
                                        <div className="text-sm uppercase">{project.status}</div>
                                        <div
                                            className="doc-title"
                                            style={{
                                                display: "flex",
                                                alignContent: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <Link href={`/projects/${project._id}`} className="link text-3xl font-bold">
                                                {project.title}
                                            </Link>
                                            <div className="text-1xl" style={{display: "flex",alignContent:"center",justifyContent:"center",gap: "20px"}}>
                                                {((session && session.user && session.user.email && session.scopusID) && session.scopusID===auid) && <Link href={`edit/${project._id}`} style={{margin: "0px",padding: "0px"}}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        class="bi bi-pencil-square"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                        />
                                                    </svg>
                                                </Link>}
                                                {(session && session.user.email && (session.role==="Admin" || session.role==="Super_Admin")) && <Link href={`edit/${project._id}`} style={{margin: "0px",padding: "0px"}}>
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="16"
                                                        height="16"
                                                        fill="currentColor"
                                                        class="bi bi-pencil-square"
                                                        viewBox="0 0 16 16"
                                                    >
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                                        <path
                                                            fill-rule="evenodd"
                                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"
                                                        />
                                                    </svg>
                                                </Link>}
                                                {((session && session.user && session.user.email && session.scopusID) && session.scopusID===auid) && <DeleteButton id={project._id}/>}
                                                {(session && session.user.email && (session.role==="Admin" || session.role==="Super_Admin")) && <DeleteButton id={project._id}/>}
                                            </div>
                                        </div>
                                        <div>
                                            <Link
                                                className="link"
                                                href={`/dept/${project.department}`}
                                            >
                                                {project.department}
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="mt-4" style={{height: "20px",overflow: "hidden",textOverflow: "ellipsis"}}>{project.description}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
            </div>}
        </main>
    );
}
