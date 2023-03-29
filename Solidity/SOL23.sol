pragma solidity >=0.7.0 <0.9.0;

interface ReturnsValue{

    //interface cannot have constructor
    //cannot have state variable
    //we can have enums and struct 
    function getValue() external virtual view returns(string memory); 
}

contract A is ReturnsValue{
   string str;
   
    function getValue() external pure returns(string memory){
        return "hello";
    }
}
contract B is ReturnsValue{
   string str='yes';
   
    function getValue() external override view returns(string memory){
        return str;
    }
}

contract Test{
    ReturnsValue[] values=[ReturnsValue(new A()),new B()];
}