import { checkVerification } from "@/utils/mongo";
import ScopusID from "./ScopusID";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function ScopusPage({params}){
    const email=params.email;
    const session=await auth();
    if(session && session.user && session.user.email && session.scopusID){
        redirect(`/author/${session.scopusID}`);
    }else if(session && session.user && session.user.email && (session.role==="Super_Admin" || session.role==="Admin")){
        redirect('/');
    }else{
        const changedEmail=email.replace("%40","@");
        const isMatch=await checkVerification(changedEmail);
        if(isMatch){
            return (
                <ScopusID email={email}></ScopusID>
            );
        }else{
            redirect('/');
        }
    }
}