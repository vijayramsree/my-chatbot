import { render, screen } from "@testing-library/react";
import { Message } from "../Message";
import { Message as AIMessage } from "ai";
import "@testing-library/jest-dom";

describe("Message Component", () => {
  it("renders the user message correctly", () => {
    const userMessage: AIMessage = {
      id: "1",
      role: "user",
      content: "Hello, Assistant!",
    };

    render(<Message message={userMessage} />);
    expect(screen.getByText("You")).toBeInTheDocument();
    expect(screen.getByText("Hello, Assistant!")).toBeInTheDocument();

    const messageBubble = screen.getByText("Hello, Assistant!");
    expect(messageBubble).toHaveClass("bg-blue-400");
  });

  it("renders the assistant message correctly", () => {
    const assistantMessage: AIMessage = {
      id: "2",
      role: "assistant",
      content: "Hello! I'm your PDF assistant. How can I help you?",
    };

    render(<Message message={assistantMessage} />);

    expect(screen.getByText("Assistant")).toBeInTheDocument();
    expect(screen.getByText("Hello! I'm your PDF assistant. How can I help you?")).toBeInTheDocument();

    const messageBubble = screen.getByText("Hello! I'm your PDF assistant. How can I help you?");
    expect(messageBubble).toHaveClass("bg-stone-200");
  });
});