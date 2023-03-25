pragma solidity >0.7.0 <0.9.0;
//exception and error
contract HelloWorld{
 mapping(address=>uint) balances;

function deposit() external payable{
    balances[msg.sender]+=msg.value;
}

function withDraw(uint amount) public{
    uint balance=balances[msg.sender];
    //string occure when error happen
    require(balance>=amount,"balance is not sufficient"); //check precondition and condition is true we go down to the code and if it is false then we stop and transation will reverted and error msg shown 
//change the balance so that they cannt withdraw again and again
balances[msg.sender]-=amount;

//send the money if condition is true

(bool sent,)=payable(msg.sender).call{value:amount}("");

require(sent,"payment failed"); //if sent it true then we can go down other wise the state is revert and we show the error msg payment failed
/**
 * or we can use
 * if(!sent){
 * revert(); //or gave error message in revert revert("payment failed")
 * }
 */




//after sending eth assert statement should be true






//assert(balances[msg.sender]==balance-amount);//assert is stronger statement to require assert validate what should be the cases is true
//assert function dont refund gas if the function revert back like require did refund the gas value
//so add it in the end of the function 

}



}