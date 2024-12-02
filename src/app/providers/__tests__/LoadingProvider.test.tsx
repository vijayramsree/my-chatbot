import { render, screen, fireEvent } from '@testing-library/react';
import { LoadingProvider, useLoading } from '../LoadingProvider';

const TestComponent = () => {
  const { isLoading, setIsLoading, temperatureValue, setTemperatureValue, selectedModel, setSelectedModel } = useLoading();

  return (
    <div>
      <div>
        <span>Loading: {isLoading ? 'True' : 'False'}</span>
        <button onClick={() => setIsLoading(!isLoading)}>Toggle Loading</button>
      </div>
      <div>
        <span>Temperature: {temperatureValue}</span>
        <button onClick={() => setTemperatureValue(0.8)}>Set Temperature to 0.8</button>
      </div>
      <div>
        <span>Selected Model: {selectedModel}</span>
        <button onClick={() => setSelectedModel('gpt-4o-mini')}>Set Model to gpt-4o-mini</button>
      </div>
    </div>
  );
};

describe('LoadingProvider', () => {
  it('provides and updates isLoading state', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText('Loading: False')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Toggle Loading'));

    expect(screen.getByText('Loading: True')).toBeInTheDocument();
  });

  it('provides and updates temperatureValue state', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText('Temperature: 0.5')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set Temperature to 0.8'));

    expect(screen.getByText('Temperature: 0.8')).toBeInTheDocument();
  });

  it('provides and updates selectedModel state', () => {
    render(
      <LoadingProvider>
        <TestComponent />
      </LoadingProvider>
    );

    expect(screen.getByText('Selected Model: gpt-4o')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Set Model to gpt-4o-mini'));

    expect(screen.getByText('Selected Model: gpt-4o-mini')).toBeInTheDocument();
  });
});