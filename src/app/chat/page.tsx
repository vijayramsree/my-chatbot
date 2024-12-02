"use client";

import { Message } from "@/components/Message";
import { PiCaretLeftLight, PiArrowFatLinesRightFill, PiChatDots } from "react-icons/pi";
import { Button, Heading, IconButton, TextField } from "@radix-ui/themes";
import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import { useLoading } from '@/app/providers/LoadingProvider';
import ModelSelector from "@/components/ModelSelector";
import TempSlider from "@/components/TempSlider";

export default function ChatPage() {
    const { selectedModel, temperatureValue } = useLoading();
    const { messages, input, handleInputChange, handleSubmit } = useChat({
        api: "/api/chat",
        initialMessages: [
          {
            id: "initial",
            role: "assistant",
            content: "Hello! I'm your PDF assistant. How can I help you?",
          },
        ],
        body: {
          selectedModel,
          temperatureValue,
        },
      });
  const form = useRef<HTMLFormElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="h-full overflow-hidden">
      <div className="h-full flex-col rounded-lg shadow-lg flex bg-neutral-100 bg-opacity-10 ">
        <div className="grid grid-flow-row-dense grid-cols-12 gap-4 h-36 md:h-14 lg:h-14 items-center justify-center ">
            <div className="col-span-12 sm:col-span-2 pl-4 pt-1">
              <Button
                className="cursor-pointer"
                variant="ghost"
                onClick={() => (window.location.href = "/upload")}
                >
                  <PiCaretLeftLight width={16} height={16} /> Upload a different file
              </Button>
          </div>
          <div className="col-span-12 sm:col-span-8 text-center">
            <Heading size="3" className="text-lg sm:text-xl md:text-2xl">Chat with your PDF</Heading>
          </div>
          <div className="col-span-12 sm:col-span-2 flex justify-end pr-4">
            <ModelSelector />
          </div>
        </div>
        <div className="flex-1 h-full overflow-y-auto" ref={messagesEndRef}>
          <div className="flex flex-col min-h-full justify-end bg-neutral-200 bg-opacity-10">
            {messages.map((m, index) => (
              <Message key={index} message={m} />
            ))}
          </div>
        </div>

        <>
          <form onSubmit={handleSubmit} ref={form}>
            <TextField.Root size="3" type="hidden">
              <TextField.Slot className="mx-2 rounded-bl-lg">
                <PiChatDots height={16} width={16} />
              </TextField.Slot>
              <div className="flex w-full items-center justify-center">
                <input
                  className="h-12 w-full bg-transparent focus:outline-none"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Type your message here..."
                />
                <div>
                  <IconButton
                    role="button"
                    type="submit"
                    size="3"
                    name="send"
                    variant="solid"
                    style={{ borderRadius: 0, borderBottomRightRadius: 5 }}
                  >
                    <PiArrowFatLinesRightFill height={16} width={16} />
                  </IconButton>
                </div>
              </div>
            </TextField.Root>
          </form>
          <div className="p-4">
          <TempSlider />
        </div>
        </>
      </div>
    </main>
  );
}
