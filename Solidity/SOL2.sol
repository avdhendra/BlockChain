pragma solidity >=0.7.0 <0.9.0;

contract HelloWorld{
    /** uint--> 0- to number of bits uint is representing value
    // int --> signed bits
    // bool --> store true and false
    // address --> 160bits to store the value
**/


/**
 * uint by default go to uint256
 * we have 
 * uint256 32 bytes
 * uint128 16 bytes
 * uint64  8 bytes
 * uint32  4 bytes
 * uint16  2 bytes
 * uint8    1 bytes
 * same for int
 * 
 * 
 * i can store smaller value in larger value variable
 * int8 x=120;
 * int32 y=x; 
 * 
 * 
 * address to save the address of other wallet
 * address x --> its by default address is 0 address it use 20 byte
 *  
 * 
 * 
 * 
 */
int y=9;
uint x=10;
function op() public{
    x=x+uint(y);
}

//constructore
//int64()
}