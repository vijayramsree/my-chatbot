/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from "@testing-library/react";
import ChatPage from "../page";
import { useChat } from "ai/react";
import { useLoading } from "@/app/providers/LoadingProvider";
import "@testing-library/jest-dom";

jest.mock('ai/react', () => ({
  useChat: jest.fn()
}));

jest.mock('@/app/providers/LoadingProvider', () => ({
  useLoading: jest.fn()
}));

jest.mock('@/components/Message', () => ({
  Message: ({ message }: any) => <div data-testid="message">{message.content}</div>
}));

jest.mock('@/components/ModelSelector', () => {
  return function MockedModelSelector() {
    return <div data-testid="model-selector">Model Selector</div>;
  };
});

jest.mock('@/components/TempSlider', () => {
  return function MockedTempSlider() {
    return <div data-testid="temp-slider">Temperature Slider</div>;
  };
});

// Mock Radix UI components
jest.mock('@radix-ui/themes', () => ({
  ...jest.requireActual('@radix-ui/themes'),
  IconButton: ({ children, ...props }: any) => (
    <button data-testid="send-button" {...props}>{children}</button>
  ),
  Button: ({ children, ...props }: any) => (
    <button data-testid="back-button" {...props}>{children}</button>
  ),
  TextField: {
    Root: ({ children }: any) => <div>{children}</div>,
    Slot: ({ children }: any) => <div>{children}</div>
  },
  Heading: ({ children }: any) => <h1>{children}</h1>
}));

describe('ChatPage', () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleInputChange = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useLoading as jest.Mock).mockReturnValue({
      selectedModel: 'gpt-4o',
      temperatureValue: 0.5
    });

    (useChat as jest.Mock).mockReturnValue({
      messages: [
        {
          id: 'initial',
          role: 'assistant',
          content: "Hello! I'm your PDF assistant. How can I help you?"
        }
      ],
      input: '',
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit
    });
  });

  it('renders main components correctly', () => {
    render(<ChatPage />);

    expect(screen.getByText('Chat Bot')).toBeInTheDocument();
    expect(screen.getByText('Upload a different file')).toBeInTheDocument();
    expect(screen.getByTestId('model-selector')).toBeInTheDocument();
    expect(screen.getByTestId('temp-slider')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Type your message here...')).toBeInTheDocument();
    expect(screen.getByTestId('send-button')).toBeInTheDocument();
    expect(screen.getByTestId('back-button')).toBeInTheDocument();
  });

  it('displays initial message', () => {
    render(<ChatPage />);
    expect(screen.getByText("Hello! I'm your PDF assistant. How can I help you?")).toBeInTheDocument();
  });

  it('handles form submission', () => {
    render(<ChatPage />);
    
    const form = screen.getByTestId('chat-form');
    fireEvent.submit(form);
    
    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('handles input changes', () => {
    render(<ChatPage />);
    
    const input = screen.getByPlaceholderText('Type your message here...');
    fireEvent.change(input, { target: { value: 'test message' } });
    
    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  it('navigates back to upload page when back button is clicked', () => {
    const mockWindowLocation = window.location;
    delete window.location;
    window.location = { ...mockWindowLocation, href: '' };
    
    render(<ChatPage />);
    
    const backButton = screen.getByTestId('back-button');
    fireEvent.click(backButton);
    
    expect(window.location.href).toBe('/upload');
    
    window.location = mockWindowLocation;
  });

  it('renders multiple messages correctly', () => {
    (useChat as jest.Mock).mockReturnValue({
      messages: [
        {
          id: 'initial',
          role: 'assistant',
          content: "Hello! I'm your PDF assistant. How can I help you?"
        },
        {
          id: '1',
          role: 'user',
          content: 'Test message'
        }
      ],
      input: '',
      handleInputChange: mockHandleInputChange,
      handleSubmit: mockHandleSubmit
    });

    render(<ChatPage />);
    
    const messages = screen.getAllByTestId('message');
    expect(messages).toHaveLength(2);
  });

  it('handles scroll behavior on new messages', async () => {
    render(<ChatPage />);

    const messagesEndDiv = screen.getByTestId('messages-end');
    expect(messagesEndDiv).toBeInTheDocument();
  });
});