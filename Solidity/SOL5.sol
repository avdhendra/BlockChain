pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld{
    /**
     * Global Keyword
     * this,msg,block,tx(transaction)
     * 
     */

    function getBalance() public view returns(uint){
        return address(this).balance; //this will gave the balance of your contract
    }

    function viewMsg() public view returns(address){
        return msg.sender; //sender is basically who invoke contract
        //msg.sig
        //msg.data
    }
    //msg.value how much eth is send to the contract or function



    //block

    /**
     * block.number
     * block.chainid
     * block.gaslimit
     * block.difficulty
     * block.timestamp
     * block.coinbase //address of miner who mine the block
     */
    function viewBlockNumber() public view returns(uint){
        return block.timestamp;
    }


    //transaction origin whole originate the transaction not who call the transaction
    function viewOrigin() public view returns (address){
        return tx.origin
    }
function viewGas() public view returns (uint){
    return gasleft(); //gave how much gas is remain of the gas limit
}
}