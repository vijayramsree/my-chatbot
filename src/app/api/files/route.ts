
// Extracts file from FormData
// Converts file to ArrayBuffer for processing
// [TODO] Vector store integration pending

import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const formData = await req.formData();
        const file = formData.get("file") as File;
        console.log('file', file);
        const fileContent = await file.arrayBuffer();
        console.log('fileContent', fileContent);

        // Need to write a function to create vector store to the PDF File

        // I would skip this step for the initial level
        
        return NextResponse.json({
            message: "File Uploaded"
        },
        {
            status: 200
        })
    } catch(error) {
        return NextResponse.json({
            message: error.message
        }, {
            status: 500
        })
    }
}