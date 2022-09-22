import {
  Button,
  Divider,
  Flex,
  Heading,
  NumberInput,
  NumberInputField,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import { useGame } from "./GameProvider";

const SizeMenu = ({ onSizeConfirmed }) => {
  const { numberOfAirplanes, setNumberOfAirplanes } = useGame();
  const [size, setSize] = useState(null);
  const toast = useToast();
  const checkBoardSize = () => {
    if (!size) {
      toast({
        title: "You did not select a board size",
        description: "Please select a board size first",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    onSizeConfirmed(size);
  };
  return (
    <Flex
      flexDir="column"
      gap={5}
      p={5}
      bgColor="blackAlpha.500"
      borderRadius={8}
      textColor="white"
    >
      <Heading size="md">Board size</Heading>
      <Divider />
      <RadioGroup
        onChange={(selectedSize) => setSize(+selectedSize)}
        value={size}
        colorScheme="linkedin"
      >
        <Stack spacing={4} direction="row">
          <Radio value={5}>5x5</Radio>
          <Radio value={8}>8x8</Radio>
          <Radio value={10}>10x10</Radio>
        </Stack>
      </RadioGroup>
      <NumberInput
        value={numberOfAirplanes}
        defaultValue={1}
        min={1}
        onChange={(val) => {
          setNumberOfAirplanes(+val);
        }}
      >
        <Text mb="8px">Number of airplanes</Text>
        <NumberInputField />
      </NumberInput>
      <Button colorScheme="linkedin" onClick={checkBoardSize}>
        Start Game
      </Button>
    </Flex>
  );
};

export default SizeMenu;
