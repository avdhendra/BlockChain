pragma solidity >=0.7.0 <0.9.0;
//we cannot manipulate the string 
//we can change it to byte then do manipulation andthen change it to the string again
contract HelloWorld{
string public x="hello world";
bytes public y;
function test(string memory str) public pure returns(string memory){
    // bytes memory convertedStr=bytes(str);
    // convertedStr.push('1'); //push and pop dont allow outside of storage and just like array we cant have dynamic size array that is inside of memory
// bytes memory convertedStr=new bytes(bytes(str).length+1);
string memory newStr=string.concat(str,'s');
return newStr;



}
}