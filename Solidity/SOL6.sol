pragma solidity >=0.7.0 <0.9.0;
 
contract HelloWorld{
   /** 1 wei= 1
    1 gwei=1e9 wei
    1 ether=1e18 wei
**/
uint public recieved;
uint public fallbackRecieved;
//receive etherum when you send the eth direct to the contract
receive() external payable{
recieved+=msg.value; //amount of eth recieved by contract
}
//this function will be called when msg.data is blank then this function will not be called

//2nd way to received the etherum is to
fallback() external payable{
fallbackRecieved+=msg.value; //this fallback function will be called when there is no function to handle the what was send to contract
//and msg.data is not empty
//msg.data contain some information that smart contract cant handle fallback function is called
//2nd time it called when try to call a function that doesnt exist this will be called and msg.value is empty it still called


}
//fallback function called when you want sending money with data or put some function call that not handle by smart contract then this will called
 
//sending eth to function that is defined by the user
uint public payRecieved;
function pay() external payable{
payRecieved+=msg.value;
}
//dont have payable you cant receive eth in the function to recieve the eth function should be payable
function withdraw() public{
    address payable user=payable(msg.sender);
   //first way to send eth bool sent=user.send(address(this).balance) //send the  etherum
//user.transfer(address(this).balance); //this dont return any bool value
//it is not the best way to transfer the money
//these two only forward 2300 gas to which ever function recieving the etherum
//this much gas is not enough to receive function to take



//prefered way to send eth
(bool sent,bytes memory data)=user.call{value:address(this).balance}(""); 
//this forward the all the gas to the who receive the eth



}


}