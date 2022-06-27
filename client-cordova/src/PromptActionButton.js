import { Box } from '@chakra-ui/react';
import CustomModal from './CustomModal.js';
import {
  useDisclosure,
} from '@chakra-ui/react';

export default function PromptActionButton({title, content, onClickHandler, ...props}){
  
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        border="1px solid teal"
        backgroundColor="transparent"
        padding="0.2rem"
        borderRadius="0.4rem"
        transition="all 0.2s ease"
        _hover={{
          "backgroundColor":"teal",
          "border":"1px solid transparent",
          "cursor": "pointer"
        }}
        onClick={onOpen}
        {...props}>
        { props.children }
      </Box>
      <CustomModal isOpen={isOpen} onClose={onClose} onPrimaryHandler={onClickHandler}/>
    </>
  );
}
