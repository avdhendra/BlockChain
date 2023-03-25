pragma solidity >0.7.0 <0.9.0;

//self Destructor
contract HelloWorld{
    //self destruct delete the smart contract from blockchain 
//   selfdestruct(); //delete the smart contract and send the balance of the contract to address which we place inside it
address owner;
constructor(){
    owner=msg.sender;
}
receive() external payable{

}
function destroy() external{
    require(owner==msg.sender,"you are not the owner");
    selfdestruct(payable(owner));
}

function getOwner() public view returns(address){
    return owner;
}


}






contract winner{
    address winner;
    uint balance;

    function pay() external payable{
        require(msg.value==1 ether,"you need to send 1 ether");
        //here what people can do is create a contract and self destruct with the address of winner contract and send ether to the contract 
        //we cannot stop it so we have to depend on the state variable not on address here
        // if(address(this).balance==7 ether){
        //     winner=msg.sender;
        // }
balance+=1 ether;
if(balance==7 ether){
winner=msg.sender;
}

    }
    function withdraw() public{
        require(msg.sender==winner,"you are not the winner");
        (bool sent,)=payable(winner).call{value:balance}("");
        require(sent,"Payment failed");
    }
}


contract Theif{
    receive() external payable{
        selfdestruct()
    }
}
