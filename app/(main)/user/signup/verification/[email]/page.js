import { checkVerify } from "@/utils/mongo";
import Verify from "./Verify";
import { redirect } from "next/navigation";
import { auth } from "@/app/auth";

export default async function VerificationPage({params}){
    const email=params.email;
    const session=await auth();
    // if(session && session.user && session.user.email && session.scopusID){
    //     redirect(`/author/${session.scopusID}`);
    // }else if(session && session.user && session.user.email && (session.role==="Super_Admin" || session.role==="Admin")){
    //     redirect('/');
    // }else{
    //     const changedEmail=email.replace("%40","@");
    //     const isMatch=await checkVerify(changedEmail);
    //     if(isMatch){
    //         return (
    //             <div>
    //                 <Verify email={email}></Verify>
    //             </div>
    //         )
    //     }else{
    //         redirect('/');
    //     }
    // }
    return (
        <div>
            <Verify email={email}></Verify>
        </div>
    )
}