import {
  Button,
  Divider,
  Flex,
  Heading,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";

const SizeMenu = ({ onSizeConfirmed }) => {
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
      <Button colorScheme="linkedin" onClick={checkBoardSize}>
        Start Game
      </Button>
    </Flex>
  );
};

export default SizeMenu;
