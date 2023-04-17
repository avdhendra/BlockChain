

export const address="0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi=[  
    "constructor()",
    "function addRenter(address walletAddress, string firstName, string lastName, bool canRent, bool active, uint256 balance, uint256 due, uint256 start, uint256 end)",
    "function balanceOf() view returns (uint256)",
    "function balanceOfRenter(address walletAddress) view returns (uint256)",
    "function canRentBike(address walletAddress) view returns (bool)",
    "function checkIn(address walletAddress)",
    "function checkout(address walletAddress)",
    "function deposit(address walletAddress) payable",
    "function getDue(address walletAddress) view returns (uint256)",
    "function getOwnerBalance() view returns (uint256)",
    "function getRenter(address walletAddress) view returns (string firstName, string lastName, bool canRent, bool active)",
    "function getTotalDuration(address walletAddress) view returns (uint256)",
    "function makePayment(address walletAddress, uint256 amount)",
    "function renterExists(address walletAddress) view returns (bool)",
    "function renters(address) view returns (address walletAddress, string firstname, string lastname, bool canRent, bool active, uint256 balance, uint256 due, uint256 start, uint256 end)",
    "function withdrawOwnerBalance() payable"
 ];
