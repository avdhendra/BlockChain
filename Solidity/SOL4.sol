pragma solidity >0.7.0 <0.9.0;

contract HelloWorld{
    //variable have by default visibility specifier as internal
    uint y=0;
    //it can be writen as uint internal x=0;
    uint public y1=0;
    //public means you can access the variable inside and outside of the contract
    //it is opposite of internal

    uint private y2=0; //private means you can access the variable only from this contract not from any derived contract
    //just this contract
//difference between private and internal is internal variable can be access by the derived contract
//while private dont allow this variable to access by any derived contract

//for function
//using public in function is same as public for variable
function x() public returns (uint){
    return 1;

}
function x2() private returns(uint){
    return 2;
}
function x3() internal returns(uint){
    return 3;

}
//only called from outside of this contract not called within the contract

function x4() external returns (uint){
    return 4;
}
function x5() public{
    x4(); //we can't called the external from this function this will gave the error
}
//return multiple value
function x6() public returns(uint,uint,uint){
return (1,1,1);
}
//view in the function used when you dont modifiy any state
//this 
uint a=1;
function x7() public view returns(uint){
    return a;
    ye();
}
//you can only call  the pure and view function from the pure and view funcion 
//you can write or not view in function if you are not updateing any state 
function ye()  public view {
    a+1;
}
/**
 * pure function is that not take anthing from outside depency the function 
 * return same value in every execution
 * 
 */

function yq() public pure{
    //a+1; can access the a because it is outside the function
    //pure function not use any state or call any function that use state
    return 1;
}
/**
 * view is which can view a state but cant modifiy it 
 * but pure is which neither view nor modify the state
 * 
 * 
 * 
 * 
 * 
 * 
 */
}