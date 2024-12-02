import { render, screen, fireEvent } from "@testing-library/react";
import ModelSelector from "../ModelSelector";
import { useLoading } from "@/app/providers/LoadingProvider";
import { Theme } from "@radix-ui/themes";

jest.mock("@/app/providers/LoadingProvider", () => ({
    useLoading: jest.fn(),
  }));
  
  describe("ModelSelector Component", () => {
    const mockSetSelectedModel = jest.fn();
  
    beforeEach(() => {
      (useLoading as jest.Mock).mockReturnValue({
        selectedModel: "gpt-3.5-turbo",
        setSelectedModel: mockSetSelectedModel,
      });
    });
  
    afterEach(() => {
      jest.clearAllMocks();
    });
  
    it("renders the selected model in the trigger", () => {
      render(
        <Theme>
          <ModelSelector />
        </Theme>
      );
      const triggerElement = screen.getByText("gpt-3.5-turbo");
      expect(triggerElement).toBeInTheDocument();
    });
  
    it("calls setSelectedModel when a model is selected", () => {
      render(
        <Theme>
          <ModelSelector />
        </Theme>
      );
  
      // Open the dropdown
      const trigger = screen.getByText("gpt-3.5-turbo");
      fireEvent.click(trigger);
  
      const modelOption = screen.getByText("gpt-4o-mini");
      fireEvent.click(modelOption);
  
      expect(mockSetSelectedModel).toHaveBeenCalledWith("gpt-4o-mini");
    });
  });