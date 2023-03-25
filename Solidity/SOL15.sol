pragma solidity >0.7.0 <0.9.0;
//looping is expensive in solidity cost gas

contract HelloWorld{
    function test(uint maxLoops) public pure{
        // while(true){
        //     continue;
        //     break;
        // }

// for(uint i;i<24;i++){

// }

uint sum=0;
for(uint i=0;i<maxLoops;i++){
    sum+=i;
}





    }
}