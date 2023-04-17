import CurrentTotals from "./CurrentTotals";
import {Stack,Box,Flex,Center} from "@chakra-ui/react"
import { useContext,useState } from "react";
import Bike from "./Bike"
import Bike1 from "../assets/bike1.jpeg"
import Bike2 from "../assets/bike2.jpeg"
import Bike3 from "../assets/bike3.jpeg"
import Bike4 from "../assets/bike4.jpeg"
import { BlockchainContext } from "../context/BlockchainProvider";
import ClipLoader from "react-spinners/ClipLoader"
import RenterForm from "./RenterForm";
const Dashboard=()=>{
    const{renterExists,currentAccount}=useContext(BlockchainContext)
    const[loading ,setLoading]=useState(true)
return(
    <Stack as={Box}
    textAlign={'center'}
    spacing={{base:20,md:36}}
    py={{base:20,md:36}}
    >
    {renterExists==null && currentAccount? <Center><ClipLoader loading={loading} size={75}/></Center>:renterExists?<CurrentTotals/>:<RenterForm/>}
    <Flex justifyContent={"center"} alignItems={'center'}>
        <Bike bike={Bike1}/>
        <Bike bike={Bike2}/>
        <Bike bike={Bike3}/>
        <Bike bike={Bike4}/>
    </Flex>
    </Stack>
)
}
export default Dashboard;