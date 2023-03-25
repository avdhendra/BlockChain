pragma solidity >0.7.0 <0.9.0;

contract HelloWorld{
    mapping(address=>uint) received;
//on calling withDraw on first call mapping value to msg.sender to 0 as it already deducted the money in firsrt call so on sec
    function withDraw() external{
        uint value=received[msg.sender];
        received[msg.sender]=0;
        payable(msg.sender).call{value:value}("");
    }
    receive() external payable{
        received[msg.sender]+=msg.value;
    }
    fallback() external payable{
        received[msg.sender]+=msg.value;
    }
    
    
}