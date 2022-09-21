import { useDisclosure } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { millisToMinutesAndSeconds } from "utils/date";
import { EndGameModal } from ".";

interface GameStatsInterface {
  date?: string;
  startTime: number;
  hits: number;
  duration?: string;
}

interface GameContextInterface {
  airplanePosition: string;
  setAirplanePosition: Dispatch<SetStateAction<string>>;
  gameStats: GameStatsInterface;
  setGameStats: Dispatch<SetStateAction<GameStatsInterface>>;
  startGameSession: () => void;
  endGame: () => void;
  restartGame: () => void;
  historicGames: GameStatsInterface[];
}

const GameContext = createContext<GameContextInterface>(null);
export const useGame = () => useContext(GameContext);
const GameProvider = ({ children }) => {
  const [airplanePosition, setAirplanePosition] = useState<string>(null);
  const [gameStats, setGameStats] = useState<GameStatsInterface>(null);
  const [historicGames, setHistoricGames] = useState<GameStatsInterface[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startGameSession = () => {
    setGameStats({
      date: new Date().toLocaleString(),
      startTime: Date.now(),
      hits: 0,
    });
  };

  const endGame = () => {
    const game = {
      ...gameStats,
      hits: gameStats.hits + 1,
      duration: millisToMinutesAndSeconds(Date.now() - gameStats.startTime),
    };
    setGameStats(game);
    const gamesHistory = JSON.parse(sessionStorage.getItem("gamesHistory"));
    if (gamesHistory) {
      sessionStorage.setItem(
        "gamesHistory",
        JSON.stringify([...gamesHistory, game])
      );
      onOpen();
      return;
    }
    sessionStorage.setItem("gamesHistory", JSON.stringify([game]));
    onOpen();
  };

  const restartGame = () => {
    setGameStats(null);
  };

  const refreshHistoricGames = () => {
    setHistoricGames(JSON.parse(sessionStorage.getItem("gamesHistory")));
  };

  useEffect(() => {
    if (!gameStats) {
      refreshHistoricGames();
    }
  }, [gameStats]);

  const positionProviderData: GameContextInterface = {
    airplanePosition,
    setAirplanePosition,
    gameStats,
    setGameStats,
    startGameSession,
    endGame,
    restartGame,
    historicGames,
  };
  return (
    <GameContext.Provider value={positionProviderData}>
      <EndGameModal isOpen={isOpen} onClose={onClose} />
      <>{children}</>
    </GameContext.Provider>
  );
};

export default GameProvider;
