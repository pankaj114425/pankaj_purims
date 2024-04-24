import { auth } from "@/app/auth";
import { insertOneProject } from "@/utils/mongo";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {
        title,
        status,
        dept,
        description,
        from,
        to,
        principal_name,
        principal_scopusID,
        amount_allocated,
        amount_received,
        installment,
        funding_agency,
        industry_partner,
        deliverables,
        copis,
    } = await req.json();
    const session=await auth();
    console.log(session);
    if(session?.user?.email && (session?.role==="Author")){
        if(title && status && dept && description && from && to && principal_name && principal_scopusID && amount_allocated && amount_received && installment && funding_agency && industry_partner && deliverables && copis){
            const allocated=parseInt(amount_allocated);
            const received=parseInt(amount_received);
            const result=await insertOneProject(
                title,
                status,
                dept,
                description,
                from,
                to,
                principal_name,
                principal_scopusID,
                allocated,
                received,
                installment,
                funding_agency,
                industry_partner,
                deliverables,
                copis,
            );
            if(result){
                return NextResponse.json({msg: "Project added successfully!",success: true});
            }else{
                return NextResponse.json({msg: "Error adding project!",success: false});
            }
        }else{
            return NextResponse.json({msg: "Fields are empty!",success: false});
        }
    }else{
        return NextResponse.json({msg: "Not authorized!",success: false});
    }
}