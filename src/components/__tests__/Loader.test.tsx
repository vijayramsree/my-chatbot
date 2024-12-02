import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";
import { useLoading } from "@/app/providers/LoadingProvider";

jest.mock("@/app/providers/LoadingProvider", () => ({
  useLoading: jest.fn(),
}));

describe("Loader Component", () => {
  it("renders the loader when isLoading is true", () => {
    (useLoading as jest.Mock).mockReturnValue({ isLoading: true });

    render(<Loader />);

    const loaderElement = screen.getByRole("status");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass("flex");
  });

  it("hides the loader when isLoading is false", () => {
    (useLoading as jest.Mock).mockReturnValue({ isLoading: false });

    render(<Loader />);

    // Check that the loader is hidden
    const loaderElement = screen.queryByRole("status");
    expect(loaderElement).toBeInTheDocument();
    expect(loaderElement).toHaveClass("hidden");
  });
});