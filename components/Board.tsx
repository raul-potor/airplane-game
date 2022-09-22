import { Flex } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { generateRandomBetweenRange } from "../utils/randomNumber";
import Cell from "./Cell";
import { useGame } from "./GameProvider";

const Board: FC<{ size: number }> = ({ size }) => {
  const [board, setBoard] = useState([]);
  const { setAirplanesPosition, numberOfAirplanes } = useGame();

  const generateAirplanes = () => {
    let airplanesPositions = [];
    while (airplanesPositions.length < numberOfAirplanes) {
      const airplanePos = `${generateRandomBetweenRange(
        0,
        size
      )}-${generateRandomBetweenRange(0, size)}`;
      if (!airplanesPositions.includes(airplanePos)) {
        airplanesPositions.push(airplanePos);
      }
    }
    return airplanesPositions;
  };

  const drawBoard = (size) => {
    let cells = [];

    for (let i = 0; i < size; i++) {
      let rowCells = [];
      for (let j = 0; j < size; j++) {
        rowCells.push(<Cell key={`${i}-${j}`} position={`${i}-${j}`} />);
      }
      cells.push(rowCells);
    }
    setAirplanesPosition(generateAirplanes());
    setBoard(cells);
  };

  useEffect(() => {
    drawBoard(size);
  }, []);
  return (
    <Flex
      maxW={{
        base: `calc(2.125rem * ${size})`,
        md: `calc(2.6125rem * ${size})`,
      }}
      flexWrap="wrap"
      gridGap={0.5}
    >
      {board}
    </Flex>
  );
};

export default Board;
