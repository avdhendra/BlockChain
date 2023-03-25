pragma solidity >=0.7.0 <0.9.0;

contract SOL{
    bool canEdit=true;
    bool admin=false;
    function canEditDoc()public view returns(bool){
        // if(canEdit){
        //     return true;

        // }else if(admin){
        //     return true;
        // }else{
        //     return false;
        // }
 return canEdit || admin ?true:false;
    }
    //map like other language
    mapping(uint =>bool)map;
mapping(uint=>mapping(uint=>int))map2;
    function addItem(uint key,uint key2,bool value,int val) public{
        map[key]=value;
        map2[key][key2]=val;
    }
    function getItem(uint key,uint key2) public view returns(int){
      //  return map[key];
    return map2[key][key2];
    }

mapping(uint=>int) map3;
//you can't define  the map from inside the function locally you have to pass the reference of another map to it


function x() public {
    mapping(uint=>int) storage map=map3;
    map[0]=1;
    map[1]=2;

}

function getItem(uint key) public view returns (int){
    return map3[key];
}

//passing mapping variable to function parameter it should pass as internal and have storage as store
function x(mapping(uint=>uint) storage map) internal{

}
//internal here means function can only be called from inside this contract 
//internal is visibility modifier
//you cant access the function outside the contract mean you cant store any key value pair from outside

}