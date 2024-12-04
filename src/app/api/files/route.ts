
// Extracts file from FormData
// Converts file to ArrayBuffer for processing
// [TODO] Vector store integration pending

import { createOrReadVectorStoreIndex } from "@/app/lib/vector-store";
import pdf from '@cyber2024/pdf-parse-fixed';

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        
        if (!file) {
            return new Response('No file provided', { status: 400 });
        }

        const fileContent = await file.arrayBuffer();
        const parsedPdf = await pdf(Buffer.from(fileContent));
        await createOrReadVectorStoreIndex(parsedPdf.text);

        return new Response(JSON.stringify({ message: 'File processed successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error processing file:', error);
        return new Response('Error processing file', { status: 500 });
    }
}