import { render, screen } from "@testing-library/react";
import { Loader } from "../Loader";
import { useLoading } from "@/app/providers/LoadingProvider";

jest.mock('@/app/providers/LoadingProvider', () => ({
    useLoading: jest.fn()
   }));
   
   describe('Loader', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
   
    it('renders loader in hidden state when isLoading is false', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: false });
      
      render(<Loader />);
      
      const loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toHaveClass('hidden');
      expect(loaderContainer).not.toHaveClass('flex');
    });
   
    it('renders loader in visible state when isLoading is true', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      
      render(<Loader />);
      
      const loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toHaveClass('flex');
      expect(loaderContainer).not.toHaveClass('hidden');
    });
   
    it('applies animation class when isLoading is true', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      
      render(<Loader />);
      
      const spinnerContainer = screen.getByRole('status').children[0];
      expect(spinnerContainer).toHaveClass('animate-spin');
    });
   
    it('does not apply animation class when isLoading is false', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: false });
      
      render(<Loader />);
      
      const spinnerContainer = screen.getByRole('status').children[0];
      expect(spinnerContainer).not.toHaveClass('animate-spin');
    });
   
    it('renders SVG elements correctly', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      
      render(<Loader />);
      
      const svg = screen.getByRole('status').querySelector('svg');
      expect(svg).toBeInTheDocument();
      expect(svg).toHaveClass('h-20', 'w-20', 'text-blue-600');
      
      const circle = svg?.querySelector('circle');
      expect(circle).toBeInTheDocument();
      expect(circle).toHaveClass('opacity-25');
      
      const path = svg?.querySelector('path');
      expect(path).toBeInTheDocument();
      expect(path).toHaveClass('opacity-75');
    });
   
    it('has correct accessibility attributes', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      
      render(<Loader />);
      
      const loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toBeInTheDocument();
      expect(loaderContainer).toHaveAttribute('role', 'status');
    });
   
    it('maintains correct styling classes when loading state changes', () => {
      const { rerender } = render(<Loader />);
      
      // Initial state: not loading
      (useLoading as jest.Mock).mockReturnValue({ isLoading: false });
      rerender(<Loader />);
      
      let loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toHaveClass('hidden');
      
      // Change to loading state
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      rerender(<Loader />);
      
      loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toHaveClass('flex');
    });
   
    it('has correct base classes regardless of loading state', () => {
      (useLoading as jest.Mock).mockReturnValue({ isLoading: true });
      
      render(<Loader />);
      
      const loaderContainer = screen.getByRole('status');
      expect(loaderContainer).toHaveClass(
        'absolute',
        'bg-white',
        'opacity-70',
        'z-10',
        'h-full',
        'w-full'
      );
    });
   });
   