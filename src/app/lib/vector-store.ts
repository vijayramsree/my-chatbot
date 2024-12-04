import fs from 'fs/promises';

export async function createOrReadVectorStoreIndex(
    pdfText?: string
) {
    const { Document, VectorStoreIndex, serviceContextFromDefaults, storageContextFromDefaults } 
        = await import("llamaindex");

    const storageDir = './storage';

    if (pdfText) {
        try {
            await fs.rm(storageDir, { recursive: true, force: true });
            await fs.mkdir(storageDir);
        } catch (error) {
            console.error('Storage cleanup error:', error);
        }
    }

    const document = new Document({ text: pdfText });

    const storageContext = await storageContextFromDefaults({
        persistDir: './storage'
    })

    const serviceContext = serviceContextFromDefaults({
        chunkSize: 2000,
        chunkOverlap: 500
    });

    const index = await VectorStoreIndex.fromDocuments(pdfText ? [document] : [], {
        serviceContext,
        storageContext
    })
    
    return index;
}