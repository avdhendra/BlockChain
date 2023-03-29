import { ethers } from "ethers";
import dotenv from "dotenv";
dotenv.config()
const network="homestead"
const provider=new ethers.providers.InfuraProvider(network,process.env.INFURA_API_KEY);
// const blockNumber=await provider.getBlockNumber();
const address="address of wallet"
// const balance=await provider.getBalance(address);
// const ethBalance=ethers.utils.formatEther(balance);
// console.log(ethBalance)
// const txCount=await provider.getTransactionCount(address);
// console.log(txCount);



// const blockNumber=await provider.getBlockNumber();
// const block=await provider.getBlockWithTransaction(blockNumber)
// console.log(block)

const fee = await provider.getGasPrice();
console.log(fee)