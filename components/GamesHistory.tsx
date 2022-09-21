import {
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useGame } from "./GameProvider";

const GamesHistory = () => {
  const { historicGames } = useGame();
  return (
    <TableContainer
      as={Box}
      position="absolute"
      right={15}
      top={15}
      maxH={72}
      overflowY="scroll"
    >
      <Table size="sm">
        {!historicGames?.length && (
          <TableCaption>No previous games</TableCaption>
        )}
        <Thead color="white">
          <Tr>
            <Th>Nr.</Th>
            <Th>Date</Th>
            <Th>Score</Th>
            <Th isNumeric>Duration</Th>
          </Tr>
        </Thead>
        <Tbody>
          {historicGames
            ?.sort((game1, game2) => game2.hits - game1.hits)
            ?.map((game, i) => (
              <Tr key={game.startTime}>
                <Td>{i + 1}</Td>
                <Td>{game.date}</Td>
                <Td isNumeric>{game.hits}</Td>
                <Td>{game.duration}</Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default GamesHistory;
