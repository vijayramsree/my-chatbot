import { render, screen, fireEvent } from '@testing-library/react';
import { useLoading } from '@/app/providers/LoadingProvider';
import TempSlider from '../TempSlider';

jest.mock('@/app/providers/LoadingProvider', () => ({
  useLoading: jest.fn()
}));

jest.mock('@radix-ui/themes', () => ({
  Slider: ({ value, onValueChange }: any) => (
    <input 
      type="range"
      data-testid="temperature-slider"
      value={value[0]}
      onChange={(e) => onValueChange([parseInt(e.target.value)])}
      min={0}
      max={100}
    />
  ),
  Flex: ({ children }: any) => <div>{children}</div>
}));

describe('TempSlider', () => {
  const mockSetTemperatureValue = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    
    (useLoading as jest.Mock).mockReturnValue({
      temperatureValue: 0.5,
      setTemperatureValue: mockSetTemperatureValue
    });
  });

  it('renders correctly with initial temperature value', () => {
    render(<TempSlider />);
    
    expect(screen.getByTestId('temp-slider')).toBeInTheDocument();
    expect(screen.getByText('Temperature:')).toBeInTheDocument();
    expect(screen.getByText('0.5')).toBeInTheDocument();
  });

  it('displays formatted temperature value', () => {
    (useLoading as jest.Mock).mockReturnValue({
      temperatureValue: 0.75,
      setTemperatureValue: mockSetTemperatureValue
    });

    render(<TempSlider />);
    expect(screen.getByText('0.8')).toBeInTheDocument();
  });

  it('handles slider value changes correctly', () => {
    render(<TempSlider />);
    
    const slider = screen.getByTestId('temperature-slider');
    
    fireEvent.change(slider, { target: { value: '70' } });
    
    expect(mockSetTemperatureValue).toHaveBeenCalledWith(0.7);
  });

  it('handles minimum temperature value', () => {
    render(<TempSlider />);
    
    const slider = screen.getByTestId('temperature-slider');
    fireEvent.change(slider, { target: { value: '0' } });
    
    expect(mockSetTemperatureValue).toHaveBeenCalledWith(0);
  });

  it('handles maximum temperature value', () => {
    render(<TempSlider />);
    
    const slider = screen.getByTestId('temperature-slider');
    fireEvent.change(slider, { target: { value: '100' } });
    
    expect(mockSetTemperatureValue).toHaveBeenCalledWith(1);
  });

  it('updates display when context value changes', () => {
    const { rerender } = render(<TempSlider />);
    
    expect(screen.getByText('0.5')).toBeInTheDocument();
    
    (useLoading as jest.Mock).mockReturnValue({
      temperatureValue: 0.3,
      setTemperatureValue: mockSetTemperatureValue
    });
    
    rerender(<TempSlider />);
    expect(screen.getByText('0.3')).toBeInTheDocument();
  });

  it('renders with correct accessibility attributes', () => {
    render(<TempSlider />);
    
    const slider = screen.getByTestId('temperature-slider');
    expect(slider).toHaveAttribute('min', '0');
    expect(slider).toHaveAttribute('max', '100');
  });
});