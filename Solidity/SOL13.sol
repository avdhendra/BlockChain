pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld{
    uint[] numbers; //dynamic type array 
    uint[5]num; //5 size element
    uint[5]az=[1,2,3,4,5];
    function add(uint x) public{
        numbers.push(x);
    }
    function pop() public{
        numbers.pop();
    }
    function length() public view returns(uint){
        return numbers.length;
    }
    function remove(uint idx) public{
        delete numbers[idx];
    }

//we cannot declare array in stack means we cannot declare array inside the function
 //we have to use the memory with array inside the function
 function test() public{
uint[3] memory numbers=[uint(1),2,4];
 }
//how to declare constant in solidity
uint constant x=1;
 function test2(uint  size) public returns (uint[] memory){
    //size should be constantuint[size] memory numbers
 uint[x] memory numbers;
 //dynamically allocated the fixed size array
 uint[] memory numbers1=new uint[](size);
return numbers1;
 
 }



function test3() public pure returns(uint[3] memory ,uint[3] memory) {
    uint[3] memory numbers=[uint(1),2,4];
    uint[3 ]memory numbers3=numbers;
   numbers3=numbers;
   numbers3[1]=0;
   //number3 and number are same array number is reference to number3 array
   return (numbers,numbers3);
}

function test4() public pure returns(uint[][3]memory){
    uint[][3] memory x=[new uint[](3),new uint[](2),new uint[](3)];
    return x;
}


}