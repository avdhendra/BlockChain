/**
 

source code ---->compiler(Etherum virtual machine(EVM))--->Byte code-----> TX--->submited to the blockchain


 */
pragma  solidity >=0.7.0 <0.9.0; //compiler version

contract Helloworld{
    uint256 number; //number by default is 0
//state changing function charge gas fee
    function store(uint256 num) public{
number=num;
    }
    function get() public view returns(uint256){
        return number;
    }
}
/**
 * there are three main method to store the data in blockchain
 * 1. storage/ holding state variable of smart contract storage is permanent in blockchain as most expensive way to store something 
 * gas associate to store the variable and change something in variable 
 * need: when you need to store the variable that are permanently store in the contract and state of the smart contract
 * 2. Memory :RAM  to store the argument that you pass to the function store the variable that is pass to the function till the function execution not 
 * completed and after that memory space for that variable is deleted it is cheaper than storage 
 * 
 * 3.Stack : small storage location store only 1024 different value stack slot are 32 bytes
 * 
 * local function variable store in stack
 */