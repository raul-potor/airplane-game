import { Center } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useGame } from "./GameProvider";

const Cell = ({ position }) => {
  const { airplanesPosition, hitCell } = useGame();
  const [isHit, setIsHit] = useState(false);
  const isAirplaneCell = airplanesPosition.find(
    (airplanePosition) => airplanePosition === position
  );
  const strikeCell = () => {
    setIsHit(true);
    hitCell(position);
  };
  return (
    <Center
      as={motion.div}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      bgColor={isHit ? (isAirplaneCell ? "green.500" : "red.500") : "cyan.500"}
      borderRadius={5}
      w={{ base: 8, md: 10 }}
      h={{ base: 8, md: 10 }}
      cursor="pointer"
      onClick={(!isHit && strikeCell) || null}
    />
  );
};

export default Cell;
