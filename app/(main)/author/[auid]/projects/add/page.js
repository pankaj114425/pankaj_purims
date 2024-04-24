import { getAllAuthor,getDepartmentbyName } from "@/utils/mongo";
import AddProject from "./AddProject";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function AddPage({params}){
    const {auid}=params;
    let dept;
    let author;
    const session=await auth();
    if((session && session.user.email && session.scopusID && session.scopusID===auid && session.role==="Author")){
        dept=await getDepartmentbyName();
        author=await getAllAuthor();
        return(
            <>
                <AddProject dept={dept} author={author} auid={auid}/>
            </>
        )
    }else if(session && session.user.email && (session.role==="Admin" || session.role==="Super_Admin")){
        dept=await getDepartmentbyName();
        author=await getAllAuthor();
        return(
            <>
                <AddProject dept={dept} author={author} auid={auid}/>
            </>
        )
    }else{
        redirect('/');
    }
}