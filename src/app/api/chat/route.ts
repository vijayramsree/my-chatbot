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