/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import ChatPage from "../page";
import { useChat } from "ai/react";
import { useLoading } from "@/app/providers/LoadingProvider";
import "@testing-library/jest-dom";
import { UseChatHelpers } from "ai/react";

jest.mock("ai/react", () => ({
  useChat: jest.fn(),
}));

jest.mock("@/app/providers/LoadingProvider", () => ({
  useLoading: jest.fn(),
}));

jest.mock("@radix-ui/themes", () => {
  const components = {
    Button: (props) => <button {...props}>{props.children}</button>,
    Heading: (props) => <h1 {...props}>{props.children}</h1>,
    IconButton: (props) => <button {...props}>{props.children}</button>,
    TextField: {
      Root: (props) => <div {...props}>{props.children}</div>,
      Slot: (props) => <div {...props}>{props.children}</div>
    }
  };
  return components;
});

jest.mock("@/components/ModelSelector", () => ({
  __esModule: true,
  default: () => <div data-testid="model-selector" />
}));

jest.mock("@/components/TempSlider", () => ({
  __esModule: true,
  default: () => <div data-testid="temp-slider" />
}));

jest.mock("@/components/Message", () => ({
  __esModule: true,
  Message: ({ message }) => <div>{message.content}</div>
}));

jest.mock("react-icons/pi", () => ({
  PiCaretLeftLight: () => <div data-testid="back-icon" />,
  PiArrowFatLinesRightFill: () => <div data-testid="send-icon" />,
  PiChatDots: () => <div data-testid="chat-icon" />
}));

describe("ChatPage Component", () => {
  const mockUseChat: UseChatHelpers & {
    addToolResult: jest.Mock;
  } = {
    messages: [
      {
        id: "initial",
        role: "assistant",
        content: "Hello! I'm your PDF assistant. How can I help you?",
      },
    ],
    input: "",
    handleInputChange: jest.fn(),
    handleSubmit: jest.fn((e) => e.preventDefault()),
    append: jest.fn(),
    reload: jest.fn(),
    stop: jest.fn(),
    error: null,
    setMessages: jest.fn(),
    setInput: jest.fn(),
    isLoading: false,
    setData: jest.fn(),
    addToolResult: jest.fn(),
  };

  const mockUseLoading = {
    isLoading: false,
    setIsLoading: jest.fn(),
    temperatureValue: 0.7,
    setTemperatureValue: jest.fn(),
    selectedModel: "gpt-3.5-turbo",
    setSelectedModel: jest.fn(),
  };

  beforeEach(() => {
    (useChat as jest.Mock).mockReturnValue(mockUseChat);
    jest.mocked(useLoading).mockReturnValue(mockUseLoading);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the initial assistant message", () => {
    render(<ChatPage />);

    expect(
      screen.getByText("Hello! I'm your PDF assistant. How can I help you?")
    ).toBeInTheDocument();
  });

  it("renders the page title and navigation elements", () => {
    render(<ChatPage />);

    expect(screen.getByText("Chat Bot")).toBeInTheDocument();
    expect(screen.getByText("Upload a different file")).toBeInTheDocument();
    expect(screen.getByTestId("model-selector")).toBeInTheDocument();
  });

  it("handles input changes correctly", () => {
    render(<ChatPage />);

    const input = screen.getByPlaceholderText("Type your message here...");
    fireEvent.change(input, { target: { value: "Test message" } });

    expect(mockUseChat.handleInputChange).toHaveBeenCalled();
  });

  it("submits the form with a message", () => {
  render(<ChatPage />);

  const input = screen.getByPlaceholderText("Type your message here...");
  const sendButton = screen.getByRole("button", { name: "" });

  fireEvent.change(input, { target: { value: "Test message" } });
  fireEvent.click(sendButton);

  expect(mockUseChat.handleSubmit).toHaveBeenCalled();
});

  it("renders the temperature slider", () => {
    render(<ChatPage />);

    expect(screen.getByTestId("temp-slider")).toBeInTheDocument();
  });

  it("navigates to upload page on back button click", () => {
    const originalLocation = window.location;
    delete (window as any).location;
    (window as any).location = { href: "" };

    render(<ChatPage />);

    const backButton = screen.getByText("Upload a different file");
    fireEvent.click(backButton);

    expect(window.location.href).toBe("/upload");

    (window as any).location = originalLocation; // Restore original location
  });

  it("scrolls to the bottom on new messages", () => {
    const { container } = render(<ChatPage />);
    const messagesContainer = container.querySelector(".flex-1");

    expect(messagesContainer.scrollTop).toBe(messagesContainer.scrollHeight);
  });
});