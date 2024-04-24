import { getAllAuthor,getDepartmentbyName, getOneProject } from "@/utils/mongo";
import EditProject from "./EditProject";
import { auth } from "@/app/auth";
import { redirect } from "next/dist/server/api-utils";

export default async function EditPage({params}){
    const {auid,projectId}=params;
    let project;
    let dept;
    let author;
    const session=await auth();
    if((session && session.user.email && session.scopusID && session.scopusID===auid && session.role==="Author")){
        dept=await getDepartmentbyName();
        author=await getAllAuthor();
        project=await getOneProject(projectId);
        return(
            <>
                <EditProject dept={dept} author={author} auid={auid} projectData={project} />
            </>
        )
    }else if(session && session.user.email && (session.role==="Admin" || session.role==="Super_Admin")){
        dept=await getDepartmentbyName();
        author=await getAllAuthor();
        project=await getOneProject(projectId);
        return(
            <>
                <EditProject dept={dept} author={author} auid={auid} projectData={project} />
            </>
        )
    }else{
        redirect('/');
    }
}

