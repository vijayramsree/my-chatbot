// Validates incoming request parameters
// Configures OpenAI model with specified parameters
// Streams response text using AI SDK
// Uses system prompt "You are a helpful assistant"
// Set Model and Temprature based on the global context

import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(req:Request) {
    const { messages, selectedModel, temperatureValue } = await req.json();

    if (!selectedModel || !messages) {
        return new Response("Invalid request", { status: 400 });
      }

  const result = streamText({
    model: openai(selectedModel),
    temperature: temperatureValue,
    system: 'You are a helpful assistant.',
    messages,
  });

  return result.toDataStreamResponse();

}