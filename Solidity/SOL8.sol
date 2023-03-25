pragma solidity >0.7.0 <0.9.0;

contract HelloWorld{
    mapping(address=>uint) changedOwed;
    function pay() external payable{
        uint value=msg.value;

        if(value>1000){
            changedOwed[msg.sender]=value-1000;
        }
    }

    function withDraw()public{
        uint value=changedOwed[msg.sender];
        changedOwed[msg.sender]=0;
        payable(msg.sender).transfer(value);
    }
}