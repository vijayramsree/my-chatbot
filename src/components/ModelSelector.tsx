import { Select, Flex, Text } from "@radix-ui/themes";
import { useLoading } from '@/app/providers/LoadingProvider';

export default function ModelSelector() {

  const {selectedModel, setSelectedModel} = useLoading();
  const models = ['gpt-3.5-turbo', 'gpt-4o-mini', 'gpt-4o'];

  const handleModelChange = (value) => {
    setSelectedModel(value);
  };

  return (
    <div className='flex row-auto'>
        <div className='flex justify-center items-center'>
            <Text as="p" mr="2">Model</Text>
        </div>
        <Flex direction="column" width="150px">
            <Select.Root value={selectedModel} onValueChange={handleModelChange}>
                <Select.Trigger>
                    <Flex as="span" align="center" gap="2">
                        {selectedModel}
                    </Flex>
                </Select.Trigger>
                <Select.Content position="popper">
                    {models.map((model) => (
                        <Select.Item key={model} value={model}>
                        {model}
                        </Select.Item>
                    ))}
                </Select.Content>
            </Select.Root>
        </Flex>
    </div>
  )
}
