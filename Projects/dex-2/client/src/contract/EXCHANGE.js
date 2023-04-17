export const EXCHANGE_ABI=[
    "constructor(address _feeAccount, uint256 _feePercent)",
    "event Cancel(uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 timestamp)",
    "event Deposit(address token, address user, uint256 amount, uint256 balance)",
    "event Order(uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 timestamp)",
    "event Trade(uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, address creator, uint256 timestamp)",
    "event Withdraw(address token, address user, uint256 amount, uint256 balance)",
    "function balanceOf(address _token, address _user) view returns (uint256)",
    "function cancelOrder(uint256 _id)",
    "function depositToken(address _token, uint256 _amount)",
    "function feeAccount() view returns (address)",
    "function feePercent() view returns (uint256)",
    "function fillOrder(uint256 _id)",
    "function makeOrder(address _tokenGet, uint256 _amountGet, address _tokenGive, uint256 _amountGive)",
    "function orderCancelled(uint256) view returns (bool)",
    "function orderCount() view returns (uint256)",
    "function orderFilled(uint256) view returns (bool)",
    "function orders(uint256) view returns (uint256 id, address user, address tokenGet, uint256 amountGet, address tokenGive, uint256 amountGive, uint256 timestamp)",
    "function tokens(address, address) view returns (uint256)",
    "function withdrawToken(address _token, uint256 _amount)"
]