import { useLocation, Link as RouterLink } from 'react-router-dom';
import { Text, Flex } from '@chakra-ui/react';



export default function FinanceNavbar(){
  const location = useLocation();
  const splitted = location.pathname.split('/');
  splitted.splice(0, 1);
  let pageHref = "";

  return(
    <Flex alignItems="center">
      {
        splitted.map((page, index, array) => {
          pageHref += "/" + page;
          return (index === splitted.length - 1) ? 
            <Text key={page} fontSize="lg" textTransform="capitalize"> { page } </Text>
          : <>
              <RouterLink key={page} to={pageHref}>
                <Text fontSize="lg" color="blue.400" textTransform="capitalize"> {page} </Text>
              </RouterLink>
              <Text fontSize="lg" px={2}> / </Text>
            </>;

      })}
    </Flex>
  );

}
