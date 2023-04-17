const { ethers } = require("hardhat");
const fs=require('fs/promises')
async function main(){
    console.log("Preparing deployment...");
    //fetch contract to deploy
    const Token=await ethers.getContractFactory("Token");
    const Exchange=await ethers.getContractFactory("Exchange");
//Fetch Accounts
const accounts=await ethers.getSigners()
    //Deploy contract

const dapp=await Token.deploy('Dapp','DAPP',"1000000")
await dapp.deployed()
console.log(`DAPP Deployed to :${dapp.address}`)

const mETH=await Token.deploy("mETH","mETH",'1000000')
await mETH.deployed()
console.log(`mDAI Deployed to :${mETH.address}`)

const mDAI=await Token.deploy("mDAI","mDAI","1000000")
await mDAI.deployed()
console.log(`mDAI Deployed To:${mDAI.address}`)
const exchange=await Exchange.deploy(accounts[1].address,10)
await exchange.deployed()
console.log(`Exchange Deployed to :${exchange.address}`)

    await writeDeploymentInfo(dapp,"dapp.json");
    await writeDeploymentInfo(exchange,"exchange.json");
}


async function writeDeploymentInfo(contract,filename=""){
    const data={
      network:hre.network.name,
      contract:{
        address:contract.address,
        signerAddress:contract.signer.address,
        abi:contract.interface.format()
      }
    }
    const content=JSON.stringify(data,null,2);
    await fs.writeFile(filename,content,{encoding:"utf-8"});
  }

  main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
  