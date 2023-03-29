pragma solidity >=0.7.0 <0.9.0;
contract Storage{
uint public x;
uint y; //by default y is internal which can be access by any contract who derived this contract
constructor(uint startingValue){
    x=startingValue;
}
function setX(uint newX) public{
    x=newX;
}
function setY(uint newY) public{
    y=newY;
}
//to those function u want to override use virtual keyword on the funtion 
function getY() public virtual view returns (uint){
    return y+10;
}

}
contract Caller{
    Storage store;
    constructor(){
       // store =new Storage();
    }
    function setX(uint x) public{
       // store.setX(x);
    }
    function getX() public view returns(uint){
//return store.x();//here x is public we have called the x like this not like in other programming langauge because it create a getter function for x
    }
}


// contract Child is Storage(4){
//    //override keyword when you function
//     // function getY() public override view returns(uint){
//     //     return y;
//     // }
//     function getY() public override view returns(uint){
//         return x+super.getY();
//     }

// }

contract Child is Storage{
   //override keyword when you function
    // function getY() public override view returns(uint){
    //     return y;
    // }
    constructor(uint startingValue) Storage(startingValue){

    }
    function getY() public override view returns(uint){
        return x+super.getY();
    }

}


contract A{
    uint x;
    function setX(uint newX) virtual public{
        x=newX;
    }
    function getX() public virtual view returns(uint){
        return 1;
    }

}
contract B{
    uint y;
    function setX(uint newY) virtual public{
        y=newY;
    }
    function getX() public virtual view returns(uint){
        return 2;
    }
}


// in multiple inheritance inheritance goes in B to A right to B
contract C is A,B{
function getX() public override(A,B) view returns(uint){
    return super.getX(); //return is 2 because inheritance order is B A
}
function setX(uint newX) public override(A,B){
    super.setX(newX);
}

}


//Example of Use of Inheritance

 enum Type{
        OnePercent,
        TwoPercent
    }



  enum Size{
        Small,
        Medium,
        Large
    }




contract Item{
    uint price;
    constructor(uint _price){
        price=_price;
    }
    function getPrice() public view returns(uint){
        return price;
    }
}
contract Milk is Item(5){
   
    Type milkType;
    uint liters;
    constructor(Type _milkType,uint _liters){
        milkType=_milkType;
        liters=_liters;
    }

}
contract Shirt is Item(10){
  
    Size size;
    constructor(Size _size){
         size=_size;
    }
}

contract Shopping{
    Item[] items;
    function addMilk(Type _type,uint liters) public{
        Milk milk=new Milk(_type,liters);
        items.push(milk);
    }
    function addShirt(Size size) public {
        Shirt shirt=new Shirt(size);
        items.push(shirt);
    }
    function getTotalPrice() public view returns(uint){
        uint price;
        for(uint idx;idx<items.length;idx++){
            price+=items[idx].getPrice();
        }
        return price;
    }
}