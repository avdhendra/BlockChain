import {
    Box,
    Flex,
    Text,
    Button,
    Stack,
    
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
  } from '@chakra-ui/react';
import {useContext} from "react"
import {Link} from "react-router-dom"
  import { BlockchainContext } from '../context/BlockchainProvider';
  export default function WithSubnavigation() {
    const { isOpen, onToggle } = useDisclosure();
  const {connect,currentAccount}=useContext(BlockchainContext)
    return (
      <Box>
        <Flex
          bg={useColorModeValue('white', 'gray.800')}
          color={useColorModeValue('gray.600', 'white')}
          minH={'60px'}
          py={{ base: 2 }}
          px={{ base: 4 }}
          borderBottom={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.900')}
          align={'center'}>
        
          <Flex flex={{ base: 1 }} justify={{ md: 'start' }}>
            <Text
              textAlign={useBreakpointValue({ md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
              fontWeight={900}
              fontSize={"x-large"}
              >
            <Link to="/">BikeChain</Link>  
            </Text>
  
           
          </Flex>
  
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={'flex-end'}
            direction={'row'}
            spacing={6}>
           
            <Button
              as={'a'}
              onClick={connect}
              display={{ md: 'inline-flex' }}
              fontSize={'sm'}
              fontWeight={600}
              color={'white'}
              bg={'teal.300'}
              href={'#'}
              _hover={{
                bg: 'teal.500',
              }}>
              {!currentAccount?"Connect Wallet":`${currentAccount.slice(0,5)}...${currentAccount.slice(currentAccount.length-4)}`}
            </Button>
          </Stack>
        </Flex>
  
   
      </Box>
    );
  }
  


  
  const NAV_ITEMS = [
   

   
  ];