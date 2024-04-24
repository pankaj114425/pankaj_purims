import { auth } from "@/app/auth";
import Signup from "./Signup";
import { redirect } from "next/navigation";

export default async function SignupPage(){
    const session=await auth();
    if(session && session.user && session.user.email){
        redirect('/');
    }
    return (
        <>
            {!(session && session.user && session.user.email) && <Signup/>}
        </>
    );
}