pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld{
    // function getTime() public view returns (uint){
    //     return block.timestamp - 1 days; //return the time when this block is added to the blockchain
    // //unix timestamp
    // }
    uint public lastTime;
    uint count;
    constructor(){
        lastTime=block.timestamp;
    }
    function increment() public{
        count++;
        lastTime=block.timestamp;

    }
    function getMinutesSinceLastCall() public view returns (uint){
        return (block.timestamp-lastTime)/1 minutes;
    }
}