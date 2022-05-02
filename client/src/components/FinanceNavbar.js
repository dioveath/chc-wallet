import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Text, Flex, Box } from '@chakra-ui/react';



export default function FinanceNavbar(){
  const location = useLocation();
  const splitted = location.pathname.split('/');
  splitted.splice(0, 1);
  let pageHref = "";

  return(
    <>
      <Flex alignItems="center">
        {
          splitted.map((page, index, array) => {
            pageHref += "/" + page;
            return (index === splitted.length - 1) ? 
              <Text key={page} fontSize="lg" textTransform="capitalize"> { page } </Text>
            : <Flex key={page}>
                <RouterLink to={pageHref}>
                  <Text fontSize="lg" color="blue.400" textTransform="capitalize"> {page} </Text>
                </RouterLink>
                <Text fontSize="lg" px={2}> / </Text>
              </Flex>;
          })}
      </Flex>
      <Box borderBottom="2px solid purple"></Box>
    </>
  );

}
