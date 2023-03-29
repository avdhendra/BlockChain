pragma solidity >=0.7.0 <0.9.0;
//Abstract class instance never created
abstract contract AbstractMath{
    function return1() public pure returns(uint){
        return 1;
    }
    function getValue() public virtual view returns (uint);
    function add5() public view returns(uint){
        return getValue() + 5;
    }
}
contract Math is AbstractMath{
    uint x;

function setX(uint _x) public{
x=_x;
}


    function getValue() public override view returns (uint){
        return x;
    }
}


abstract contract Test{
    uint x;
    //constructor is internal by default so it not initialized by outside of the contract or 
    //so if we write internal in constructor the contract must be abstract
    constructor(uint _x){
        x=_x;
    }
}
contract A is Test(2){

}