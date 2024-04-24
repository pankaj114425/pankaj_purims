import { checkVerify, fetchToken ,insertVerified} from "@/utils/mongo";
import { NextResponse } from "next/server";
const bcrypt=require("bcryptjs");

export async function POST(req){
    const {email,token}=await req.json();
    if(email && token){
        //check if the user exists
        const user=await checkVerify(email);
        if(user){
            const result=await fetchToken(email);
            if(result){
                const isMatched=await bcrypt.compareSync(token,result);
                if(isMatched){
                    const response=await insertVerified(email);
                    if(response){
                        return NextResponse.json({msg: "OTP verified successfully!",success: true});
                    }else{
                        return NextResponse.json({msg: "Error verifying!",success: false});
                    }
                }else{
                    return NextResponse.json({msg: "Invalid OTP!",success: false})
                }
            }else{
                return NextResponse.json({msg: "Invalid...",success: false})

            }
        }else{
            return NextResponse.json({msg: "You are not registered!",success: false})
        }
    }else{
        return NextResponse.json({msg: "Please fill the remaining fields!",success: false})
    }
}