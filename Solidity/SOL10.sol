pragma solidity >0.7.0 <0.9.0;
contract HelloWorld{
    address owner;
    //construtor
    constructor(){
owner=msg.sender; //set the address of who ever deploy the smart contract
    }
    receive() external payable{

    }
    function withDraw(uint amount) public{
        require(msg.sender==owner);
        require(address(this).balance>=amount,"not enough balance");
        (bool sent,)=payable(owner).call{value:amount}("");
require(sent,"failed to send");
    }
}