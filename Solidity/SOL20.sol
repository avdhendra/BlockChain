pragma solidity >=0.7.0 <0.9.0;
contract HelloWorld{
    //enum is uint8 value
    enum Status{
        Pending, //0
        Shipped, //1
        Delivered //2
    }
    Status public status;
    function setStatus(Status val) public {
        status=val;
    }
    function isDelivered() public view returns (bool){
        return status==Status.Delivered;
    }
    
}