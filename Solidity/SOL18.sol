pragma solidity >=0.7.0 <0.9.0;
contract HelloWorld{
    mapping(address=>Person) people;
    
    struct Person{
        string name;
        address addr;
        uint balance;
    }
    function createPerson(string memory name) public payable{
        // Person memory p=Person(name,msg.sender,msg.value);
        //or
Person memory p=Person({name:name,balance:msg.value,addr:msg.sender});

people[msg.sender]=p;


    }
    function getName() public view returns (string memory){
return people[msg.sender].name;
    }

    function setName(string memory newName) public{
        people[msg.sender].name=newName;
    }
}

contract Frd{
    mapping(address=>Person) people;
    struct Person{
string name;
address addr;
Person[] friends;

    }
    function setName(string memory name) public{
        people[msg.sender].addr=msg.sender;
        people[msg.sender].name=name;
    }
    function addFriend(address friend) public{
        require(people[friend].addr!=address(0),"friend has not set name");
        people[msg.sender].friends.push(people[friend]);
    }
    function getFriendNames() public view returns (string [] memory){
        uint numNames=people[msg.sender].friends.length;
        string[] memory names=new string[](numNames);
        for(uint idx;idx<numNames;idx++){
            names[idx]=people[msg.sender].friends[idx].name;
        }
        return names;
    }
}