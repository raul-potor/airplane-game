import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGame } from "./GameProvider";

const Cell = ({ position }) => {
  const { airplanePosition, setGameStats, endGame } = useGame();
  const [isHit, setIsHit] = useState(false);
  const isAirplaneCell = position === airplanePosition;
  const hitCell = () => {
    setIsHit(true);
    if (isAirplaneCell) {
      endGame();
      return;
    }
    setGameStats((gameStats) => ({
      ...gameStats,
      hits: gameStats.hits + 1,
    }));
  };
  return (
    <Center
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      bgColor={isHit ? (isAirplaneCell ? "green.500" : "red.500") : "cyan.500"}
      borderRadius={5}
      w={10}
      h={10}
      cursor="pointer"
      onClick={(!isHit && hitCell) || null}
    >
      {position === airplanePosition ? "1" : "0"}
    </Center>
  );
};

export default Cell;
