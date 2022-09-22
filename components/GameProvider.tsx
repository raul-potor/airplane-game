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
  date: string;
  startTime: number;
  hits: number;
  duration?: string;
  noHitAirplanes: number;
}

interface GameContextInterface {
  airplanesPosition: string[];
  setAirplanesPosition: Dispatch<SetStateAction<string[]>>;
  gameStats: GameStatsInterface;
  setGameStats: Dispatch<SetStateAction<GameStatsInterface>>;
  startGameSession: () => void;
  endGame: () => void;
  restartGame: () => void;
  historicGames: GameStatsInterface[];
  setNumberOfAirplanes: Dispatch<SetStateAction<number>>;
  numberOfAirplanes: number;
  hitCell: (string) => void;
}

const GameContext = createContext<GameContextInterface>(null);
export const useGame = () => useContext(GameContext);
const GameProvider = ({ children }) => {
  const [airplanesPosition, setAirplanesPosition] = useState<string[]>([]);
  const [gameStats, setGameStats] = useState<GameStatsInterface>(null);
  const [historicGames, setHistoricGames] = useState<GameStatsInterface[]>([]);
  const [numberOfAirplanes, setNumberOfAirplanes] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const startGameSession = () => {
    setGameStats({
      date: new Date().toLocaleString(),
      startTime: Date.now(),
      hits: 0,
      noHitAirplanes: 0,
    });
  };

  const hitCell = (cellPoistion) => {
    setGameStats((gameStats) => ({
      ...gameStats,
      noHitAirplanes: airplanesPosition.includes(cellPoistion)
        ? gameStats.noHitAirplanes + 1
        : gameStats.noHitAirplanes,
      hits: gameStats.hits + 1,
    }));
  };

  const endGame = () => {
    const game = {
      ...gameStats,
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

  useEffect(() => {
    if (gameStats?.noHitAirplanes === numberOfAirplanes) {
      endGame();
    }
  }, [gameStats?.noHitAirplanes]);

  const positionProviderData: GameContextInterface = {
    airplanesPosition,
    setAirplanesPosition,
    gameStats,
    setGameStats,
    startGameSession,
    endGame,
    restartGame,
    historicGames,
    setNumberOfAirplanes,
    numberOfAirplanes,
    hitCell,
  };
  return (
    <GameContext.Provider value={positionProviderData}>
      <EndGameModal isOpen={isOpen} onClose={onClose} />
      <>{children}</>
    </GameContext.Provider>
  );
};

export default GameProvider;
