// Validates incoming request parameters
// Configures OpenAI model with specified parameters
// Streams response text using AI SDK
// Uses system prompt "You are a helpful assistant"
// Set Model and Temprature based on the global context

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';
import { createOrReadVectorStoreIndex } from "@/app/lib/vector-store";

export async function POST(req: Request) {
    try {
        const { messages, selectedModel, temperatureValue } = await req.json();

        const latestMessage = messages[messages.length - 1];

        // Dynamic import for LlamaIndex
        const { MetadataMode } = await import('llamaindex');

        const index = await createOrReadVectorStoreIndex();

        let systemPrompt = 'You are a helpful AI Assistant';

        const retriever = index.asRetriever({
          similarityTopK: 1
        });

        const [matchingNodes] = await retriever.retrieve(latestMessage.content);

        if (matchingNodes.score > 0.7) {
            const knowledge = matchingNodes.node.getContent(MetadataMode.NONE);
            systemPrompt = `You are a helpful AI Assistant. Your knowledge is enriched by this document ${knowledge}. When possible explain the reasoning for your response based on this knowledge`;
        }

        const result = streamText({
            model: openai(selectedModel),
            temperature: temperatureValue,
            system: systemPrompt,
            messages,
        });

        return result.toDataStreamResponse();

    } catch (error) {
        console.error('Error in chat route:', error);
        return new Response('Error processing your request', { status: 500 });
    }
}