import { getAuthor, updateNewUser, updateOneProject, updateUserProject } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(req) {
    const {data,auid} = await req.json();
    if(data && auid){
        const author=await getAuthor(auid);
        const name=author.profile.lastName+", "+(author.profile.middleName?author.profile.middleName:"")+" "+author.profile.firstName;
        const res=await updateUserProject(data,auid,name);
        const result=await updateNewUser(auid);
        if(result && res){
            return NextResponse.json({msg: "Project updated successfully!",success: true});
        }else{
            return NextResponse.json({msg: "Error updating project!",success: false});
        }
    }else{
        return NextResponse.json({msg: "Fields are empty!",success: false});
    }
}