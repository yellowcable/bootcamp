pragma solidity ^0.4.13;

library SafeMath {
	function times(uint256 x, uint256 y) internal returns (uint256) {
		uint256 z = x * y;
		assert(x == 0 || (z / x == y));
		return z;
	}
	
	function plus(uint256 x, uint256 y) internal returns (uint256) {
		uint256 z = x + y;
		assert(z >= x && z >= y);
		return z;
	}

  	function div(uint256 a, uint256 b) internal constant returns (uint256) {
	    // assert(b > 0); // Solidity automatically throws when dividing by 0
	    uint256 c = a / b;
	    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
	    return c;
  	}
}

library Library {
  struct data {
     uint256 val;
     bool isInvestor;
   }
}

contract SocialICO {
	using SafeMath for uint256;
	using Library for Library.data;
	
	string public name = "Social ICO"; 
    string public symbol = "SICO";
    uint8 public decimals = 18;
	
	address public owner;

	uint256 public tokensPerEther = 2;

	uint256 public maxICOCap = 30 ether;
	uint256 public minICOCap = 10 ether;
	
	mapping(address => uint256) public balances;
	mapping(address => Library.data) public invested;
	
	uint256 private distributedAmount = 0;
	uint256 private icoWeiRaised = 0;
	uint256 private stakeApproved = 0;

	bool private ended = false;
	bool private approved = false;

	event EventDonated(address indexed _who, uint256 _amount);
	event EventApproved(address indexed _who);
	event EventDrain(address indexed _who, uint256 _amount);
    
	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	modifier isWorking() {
		require(icoWeiRaised < maxICOCap);
		_;
	}

	modifier isApproved() {
		require(approved);
		_;
	}

	modifier isInvestor() {
		require(invested[msg.sender].isInvestor);
		_;
	}

	function SocialICO() {
		owner = msg.sender;
	}
	
	function getBalance() constant returns (uint256) {
		return balances[msg.sender];
	}
	
	function()
		payable 
		isWorking
	{		
		require(msg.value > 0); 
		
		uint256 tokenAmount = msg.value.times(tokensPerEther);
		balances[msg.sender] = balances[msg.sender].plus(tokenAmount);
		invested[msg.sender].val = invested[msg.sender].val.plus(msg.value);
		distributedAmount = distributedAmount.plus(tokenAmount);
		icoWeiRaised = icoWeiRaised.plus(msg.value);
		
		invested[msg.sender].isInvestor = true;

		EventDonated(msg.sender, msg.value);
	}

	function Approve() 
		isInvestor
	{		
		stakeApproved = stakeApproved + invested[msg.sender].val;

		if(stakeApproved >= (icoWeiRaised.div(3))){
			approved = true;
		}

		EventApproved(msg.sender);
	}

	function CheckApproval() returns (bool){
		return approved;
	}

	function Drain() 
		onlyOwner
		isApproved
	{
		uint256 weiAmount = this.balance;
		owner.transfer(weiAmount);
		
		EventDrain(owner, weiAmount);
	}

	function Raised() returns (uint256){
		return icoWeiRaised;
	}

	function ContractBalance() returns (uint256) {
		return this.balance;
	}
}