import { render, screen, act, renderHook } from '@testing-library/react';
import { useLoading, LoadingProvider } from '../LoadingProvider';

describe('LoadingProvider', () => {
  // Test if Provider renders children
  it('renders children correctly', () => {
    render(
      <LoadingProvider>
        <div data-testid="child">Test Child</div>
      </LoadingProvider>
    );
    
    expect(screen.getByTestId('child')).toBeInTheDocument();
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  // Test useLoading hook initial values
  it('provides correct initial values', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider
    });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.temperatureValue).toBe(0.5);
    expect(result.current.selectedModel).toBe('gpt-4o');
  });

  // Test loading state updates
  it('updates loading state correctly', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider
    });

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);
  });

  // Test temperature value updates
  it('updates temperature value correctly', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider
    });

    act(() => {
      result.current.setTemperatureValue(0.8);
    });

    expect(result.current.temperatureValue).toBe(0.8);
  });

  // Test model selection updates
  it('updates selected model correctly', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider
    });

    act(() => {
      result.current.setSelectedModel('gpt-3.5-turbo');
    });

    expect(result.current.selectedModel).toBe('gpt-3.5-turbo');
  });

  // Test multiple state updates
  it('handles multiple state updates correctly', () => {
    const { result } = renderHook(() => useLoading(), {
      wrapper: LoadingProvider
    });

    act(() => {
      result.current.setIsLoading(true);
      result.current.setTemperatureValue(0.7);
      result.current.setSelectedModel('gpt-4');
    });

    expect(result.current.isLoading).toBe(true);
    expect(result.current.temperatureValue).toBe(0.7);
    expect(result.current.selectedModel).toBe('gpt-4');
  });

  // Test with a consumer component
  it('works correctly with a consumer component', () => {
    const TestConsumer = () => {
      const { isLoading, setIsLoading } = useLoading();
      return (
        <button 
          data-testid="toggle-button"
          onClick={() => setIsLoading(!isLoading)}
        >
          {isLoading ? 'Loading' : 'Not Loading'}
        </button>
      );
    };

    render(
      <LoadingProvider>
        <TestConsumer />
      </LoadingProvider>
    );

    const button = screen.getByTestId('toggle-button');
    expect(button).toHaveTextContent('Not Loading');

    act(() => {
      button.click();
    });

    expect(button).toHaveTextContent('Loading');
  });
});