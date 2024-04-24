
import { updateauthor } from "@/utils/mongo";
import { NextResponse } from "next/server";
export async function POST(req) {


    // Extract data from the FormData
  try {
    const formdata = await req.formData();
   
    // Extract data from the FormData
    const scopusID = formdata.get('scopusID');
    const llm = formdata.get('llm');
    const img = formdata.get('img');
    // Call the updateauthor function to update the author's information
    const result = await updateauthor(scopusID, { llm, img});
    
    // Check if the update was successful
    if (result.ok === 1) {
      return NextResponse.json({ message: "Profile updated successfully!", status: 200, success: "true" });
    } else {
      return NextResponse.json({ message: "Update failed!", status: 500, success: "false" });
    }
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "IError...", status: 500, success: "false" });
  }
}
