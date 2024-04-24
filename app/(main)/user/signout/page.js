import { redirect } from "next/navigation";
import Signout from "./Signout"
import { auth } from "@/app/auth";

export default async function SignOutPage(){
    const session=await auth();
    if(!(session && session.user && session.user.email)){
        redirect('/');
    }
    return (
        <>
            {(session && session.user && session.user.email) && <Signout/>}
        </>
    );
}