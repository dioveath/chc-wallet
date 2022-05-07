import {
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';


function CustomModal({isOpen, onClose, onPrimaryHandler}){

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader> Delete </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Text> Are you sure you want to delete?</Text>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            Close
          </Button>
          <Button colorScheme='red' onClick={onPrimaryHandler}> Delete </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>    
  );
}

export default CustomModal;
