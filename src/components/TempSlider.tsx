// UI Component for Temprature Slider
// Redix UI Slider component used for range slider
// UseLoading Value from context provider

import { Slider, Flex } from '@radix-ui/themes';
import { useLoading } from '@/app/providers/LoadingProvider';

export default function TempSlider() {
  const { temperatureValue, setTemperatureValue } = useLoading();

  const handleTemperatureChange = (value: number) => {
    const temperature = value / 100;
    setTemperatureValue(temperature);
  };
  return (
    <div className="p-4" data-testid="temp-slider">
        <div className="flex items-center justify-start mb-2">
          <span>Temperature: </span>
          <span className='mx-2'>{temperatureValue.toFixed(1)}</span>
        </div>
          <Flex direction="column" gap="4" maxWidth="300px">
            <Slider value={[Number(temperatureValue * 100)]}
                onValueChange={(value) => handleTemperatureChange(value[0])}
                min={0}
                max={100}
                step={10}
                radius="small"
                aria-label="Temperature" />
          </Flex>
      </div>
  )
}