import { updateOneProject } from "@/utils/mongo";
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
        id,
    } = await req.json();
    if(title && status && dept && description && from && to && principal_name && principal_scopusID && amount_allocated && amount_received && installment && funding_agency && industry_partner && deliverables && copis){
        const allocated=parseInt(amount_allocated);
        const received=parseInt(amount_received);
        const result=await updateOneProject(
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
            id,
        );
        if(result){
            return NextResponse.json({msg: "Project updated successfully!",success: true});
        }else{
            return NextResponse.json({msg: "Error updating project!",success: false});
        }
    }else{
        return NextResponse.json({msg: "Fields are empty!",success: false});
    }
}