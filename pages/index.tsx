import { Board, GamesHistory, SizeMenu } from "@/components";
import { Center } from "@chakra-ui/react";
import { useGame } from "components/GameProvider";
import type { NextPage } from "next";
import { useState } from "react";

const Home: NextPage = () => {
  const [boardSize, setBoardSize] = useState(null);
  const { startGameSession, gameStats } = useGame();
  const startGame = (size) => {
    setBoardSize(size);
    startGameSession();
  };
  return (
    <Center h="100vh">
      {gameStats ? (
        <Board size={boardSize} />
      ) : (
        <SizeMenu onSizeConfirmed={(size) => startGame(size)} />
      )}
      <GamesHistory />
    </Center>
  );
};

export default Home;
