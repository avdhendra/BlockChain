pragma solidity >=0.7.0 <0.9.0;
contract HelloWorld{
    address owner;
    uint public  modifierCount;
    constructor(){
        owner=msg.sender;
    }
 
    //in which ever function we declare this modifier first modifier execute then  function
    modifier onlyOwner{
        require(msg.sender==owner);
        modifierCount++;
        _; //underscore does is execute the function that is modifiy without this underscore you cant declare the modifer
    }
    function test1() public  onlyOwner returns(uint){
        require(msg.sender==owner);
        return 1;
    }
    function test2() public view returns(uint){
        require(msg.sender==owner);
        return 1;
    }
}

contract Hello{
    uint public x;
    uint public y;
    uint public z;
    modifier costs(uint value){
        require(msg.value>=value);
        _;
    }
    modifier greaterThan(uint value,uint min){
        require(value>min);
        _;
    }
    function setX(uint num)public payable costs(1 ether) greaterThan(num,10){
        x=num;
    }
    function setY(uint num) public payable costs(1 ether){
        y=num;
    }
    function setZ(uint num) public payable costs(1 ether){

    }
}
contract World{
    uint public x;
    uint public count;
    modifier costs(uint value){
        require(msg.value>=value);
        _; //this underscore use to execute the other modifier 
    }
    modifier greaterThan(uint value,uint min){
        require(value>min);
        _; //this underscore use to execute the setX function so count ++ only execute once
    //we can execute the setX function mutliple time by using 
    /**
      _; underscore as many time as can 

      or we can gave the condition when to execute the funtion
      if(true){
        _;
      }
     */
    
    
    }
    function setX(uint num)public payable costs(1 ether) greaterThan(num,10){
        x=num;
        count++;
    }
}