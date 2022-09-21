import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FC } from "react";
import { useGame } from "./GameProvider";

interface EndGameModalInterface {
  onClose: () => void;
  isOpen: boolean;
}

const EndGameModal: FC<EndGameModalInterface> = ({ onClose, isOpen }) => {
  const { restartGame, gameStats } = useGame();
  const closeModal = () => {
    restartGame();
    onClose();
  };
  return (
    <Modal isCentered isOpen={isOpen} onClose={closeModal}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign="center">You win!</ModalHeader>
        <ModalBody>
          <Text>
            <strong>Date:</strong> {gameStats?.date}
          </Text>
          <Text>
            <strong>Duration:</strong> {gameStats?.duration}
          </Text>
          <Text>
            <strong>Strikes:</strong> {gameStats?.hits}
          </Text>
        </ModalBody>
        <ModalFooter justifyContent="center">
          <Button colorScheme="linkedin" mr={3} onClick={closeModal}>
            Play again
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EndGameModal;
