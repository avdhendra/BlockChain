import {Box ,Image,Text,Stack,Button} from "@chakra-ui/react"
import { useContext } from "react"
import { BlockchainContext } from "../context/BlockchainProvider"


const Bike=({bike})=>{
  const{checkOut,checkIn}=useContext(BlockchainContext)
    return(
        <Box boxSize='lg' mx={2}>
            <Image src={bike} mb={10}/>
<Text>Haaskdnf;asdknfasnfsdjnflsjdfljsdfjsbflkjsbdfljsbdfljsbflkbjsdfljbf</Text>
<Stack spacing={0} direction={'row'} align={'center'} justify={"center"} mt={5}>
<Button
            m={2}
            fontSize={"sm"}
            fontWeight={600}
              color={'white'}
              bg={'teal.500'}
             onClick={checkOut}
              _hover={{
                bg: 'teal.300',
              }}>
              Check Out
            </Button>
            <Button
           
           m={2}
           fontSize={"sm"}
           color={'white'}
           fontWeight={600}
             onClick={checkIn}
             bg={'teal.500'}
            
             _hover={{
               bg: 'teal.300',
             }}
              >
              Check In
            </Button>
</Stack>

        </Box>
    )
}
export default Bike