pragma solidity >=0.7.0 <0.9.0;
//Library dont have any state it is stateless
//Library cannot be destory
//Library cannot inherit
//Library cannot inherit from
//cannot have abstract function
library Math{
function max(int [] memory numbers) public pure returns(int){
    if(numbers.length==0){
        return 0;
    }
    int currentMax=numbers[0];
    for(uint idx;idx<numbers.length;idx++){
        if(numbers[idx]>currentMax){
            currentMax=numbers[idx];
        }
    }
    return currentMax;
}
}


contract Test{
    int[] numbers;
    function addNumber(int number) public{
        numbers.push(number);
    }
    using Math for int[];
    function getMax() public view returns (int){
      //  return Math.max(numbers); no calling the math function this way there is another way
return numbers.max();
    }
}