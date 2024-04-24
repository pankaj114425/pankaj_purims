import { NextResponse } from "next/server";

export async function POST(req){
    const {email,password}=await req.json();
    console.log(email,password);
    if(email && password){
        return NextResponse.json({msg: "Authentication Successful!",success: true});
    }else{
        return NextResponse.json({msg: "Fields are empty",success: false});
    }
}