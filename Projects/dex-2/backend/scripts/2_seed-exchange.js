// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

const tokens=(n)=>{
  return ethers.utils.parseUnits(n.toString(),'ether')

}

const wait=(seconds)=>{
  const millisecond=seconds*1000;
  return new Promise(resolve=>setTimeout(resolve, millisecond))
}

async function main() {
  //Fetch accounts from wallet-these are unlocked
  const accounts=await ethers.getSigners()
  //fetch deployed tokens
  const Dapp=await ethers.getContractAt('Token','0x0165878A594ca255338adfa4d48449f69242Eb8F')
  console.log(`Dapp Token fetched:${Dapp.address}`)
  
  const mETH=await ethers.getContractAt('Token','0xa513E6E4b8f2a923D98304ec87F64353C4D5C853')
  console.log(`mETH Token fetched:${mETH.address}`)
  
  const mDAI=await ethers.getContractAt('Token','0x2279B7A0a67DB372996a5FaB50D91eAA73d2eBe6')
  console.log(`Dapp Token fetched:${mDAI.address}`)
//fetch the deployed exchange
  const exchange=await ethers.getContractAt('Token','0x8A791620dd6260079BF849Dc5567aDC3F2FdC318')
  console.log(`exchnage Token fetched:${exchange.address}`)

  //Give tokens to account[1]
  const sender=accounts[0]
  const receiver=accounts[1]
  let amount=tokens(10000)
   
  //user1 transfers 10000 mEth
  let transaction,result
  transaction=await mETH.connect(sender).transfer(receiver.address,amount)
  console.log(`Transferrred ${amount} tokens from ${sender.address} to ${receiver.address}\n`)

  //set up exchange users
  const user1=accounts[0]
  const user2=accounts[1]
  amount=tokens(10000)

  //user1 approves 10,000 Dapp
  transaction=await Dapp.connect(user1).approve(exchange.address,amount)
  await transaction.wait()
  console.log(`Approved ${amount} tokens from ${user1.address}`)


  //user1 deposut 10000 DApp

  transaction=await exchange.connect(user1).depositToken(Dapp.address,amount)
  await transaction.wait()
  console.log(`Deposed ${amount} Ether from ${user1.address}\n`)
  
  //User 2 Approves mETH
  transaction=await mETH.connect(user2).approve(exchange.address,amount)
  await transaction.wait()
  console.log(`Approved ${amount} tokens from ${user2.address}`)

  //User 2 Deposit mETH
  transaction=await exchange.connect(user2).depositToken(mETH.address,amount)
  await transaction.wait()
  console.log(`Deposited ${amount} tokens from ${user2.address}`)

  //////////////////////////////////////////
  //Seed a Cancelled Order
  //User1 makes order to get tokens
  let orderId
  transaction=await exchange.connect(user1).makeIrder(mETH.address,tokens(100),Dapp.address,tokens(5))
  result =await transaction.wait()
  console.log(`Make order from ${user1.address}`)
  //user1 cancel order
  transaction=await exchange.connect(user1).cancelOrder(orderId)
  result=await transaction.wait()

  console.log(`Cancelled Order from ${user1.address}\n`)
  //wait 1 second
  await wait(1)
  //////////////////////////////////////////
  //Seed Filled Orders

  //User 1 makes order

  transaction=await exchange.connect(user1).makeOrder(mETH.address,tokens(100),Dapp.address,tokens(10))
  result=await transaction.wait()
  console.log(`Made order from ${user1.address}`)

  //User 2 fills orders
  orderId=result.events[0].args.id
  transaction=await exchange.connect(user2).fillOrders(orderId)
  result=await transaction.wait()
  console.log(`Filled order from ${user1.address}`)
  await wait(1)

//////////////////////////////////
//Seed Open Orders
//User 1 makes 10 Orders

for(let i=1;i<=10;i++){
  transaction=await exchange.connect(user1).makeOrder(mETH.address,tokens(10*i),Dapp.address,tokens(10))
  result=await transaction.wait()

  console.log(`Made order from ${user1.address}`)
  //wait 1 second
  await wait(1)
}

//User 2 makes 10 orders
for(let i=1;i<=10;i++){
  transaction=await exchange.connect(user2).makeOrder(Dapp.address,tokens(10),mETH.address,tokens(10*i))
  result=await transaction.wait()
  console.log(`Made order from ${user2.address}`)
  //Wait 1 second
  await wait(1)
}
  
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
