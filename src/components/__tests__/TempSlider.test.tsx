import { render, screen } from '@testing-library/react';
import TempSlider  from '../TempSlider';
import { useLoading } from '@/app/providers/LoadingProvider';

// Mock the useLoading hook
jest.mock('@/app/providers/LoadingProvider', () => ({
  useLoading: jest.fn(),
}));

describe('TempSlider', () => {
  let setTemperatureValueMock;

  beforeEach(() => {
    const mockLoadingState = {
        temperatureValue: 50,
        setTemperatureValue: setTemperatureValueMock,
      };
  
      (useLoading as jest.Mock).mockReturnValue(mockLoadingState);
  });

  it('renders the temperature value correctly', () => {
    render(<TempSlider />);

    expect(screen.getByText('Temperature:')).toBeInTheDocument();
    expect(screen.getByText('50.0')).toBeInTheDocument();
  });

});