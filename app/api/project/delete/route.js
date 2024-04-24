import { removeUserProject } from "@/utils/mongo";
import { NextResponse } from "next/server";

export async function POST(req){
    const {id}=await req.json();
    const result=await removeUserProject(id);
    if(result){
        return NextResponse.json({msg: "The project was deleted successfully!",result: true});
    }else{
        return NextResponse.json({msg: "Error deleting the project!",result: false});
    }
}