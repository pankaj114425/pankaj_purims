import Updatecom from "@/components/Updatecom";
import { getAuth } from "@/utils/mongo"
// import UpdatePage from "./Update";
import Card from "@/components/UI/Card";
import { auth } from "@/app/auth";
import { redirect } from "next/navigation";

export default async function update({ params = { auid: "" }}){
    const authdata= await getAuth(params.auid);
    const session=await auth();
    if(!(session && session.user && session.user.email && session.scopusID)){
        redirect('/');
    }
    return(
        <>
            {(session && session.user && session.user.email && session.scopusID) && <Updatecom data={authdata}/>}
        </>
    )
}