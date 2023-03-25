pragma solidity >=0.7.0 <0.9.0;

contract Auction{
    address owner;
    uint highestBid;
    address highestBidder;
    mapping(address=>uint)oldBids;

constructor(){
    owner=msg.sender;
}




//to see the log of other people bidding 
//indexed is doing to search through the bid event by bidder address
event Bid(address indexed bidder,uint value);
event StopAuction(address indexed highestBidder,uint highestBid);
    function bid() external payable{
        require(msg.value>highestBid,'bid too low');
        require(owner!=msg.sender,'owner cannot bid');
        oldBids[highestBidder]=highestBid;
        highestBid=msg.value;
        highestBidder=msg.sender;
        emit Bid(msg.sender,msg.value);

    }
    function withdraw() external{
        require(msg.sender!=owner,'owner cannot withdraw');
        uint value=oldBids[msg.sender];
        oldBids[msg.sender]=0;
        (bool sent,)=payable(msg.sender).call{value:value}("");
        require(sent,'payment failed');
    }

    function stopAuction() external{
        require(msg.sender==owner);
        emit StopAuction(highestBidder, highest);
        selfdestruct(payable(owner));
    }
}