import { Box } from '@chakra-ui/react';


export default function ActionButton(props){
  return (
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
      {...props}
    />
  );
}
