pragma solidity ^0.4.2;

import "./NVCryptToken.sol";

contract NVCryptTokenSale {
	address admin;
	NVCryptToken public tokenContract;
	uint256 public tokenPrice;
	uint256 public tokensSold;

	event Sell(address _buyer, uint256 _amount);

	constructor (NVCryptToken _tokenContract, uint256 _tokenPrice) public {
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}
	
	function multiply(uint x, uint y) internal pure returns (uint z) {
        require(y == 0 || (z = x * y) / y == x);
    }

	function buyTokens(uint _numberOfTokens) public payable {
		require(msg.value == multiply(_numberOfTokens, tokenPrice));
		require(tokenContract.balanceOf(this) >= _numberOfTokens);
		require(tokenContract.transfer(msg.sender, _numberOfTokens));

		tokensSold += _numberOfTokens;

		emit Sell(msg.sender, _numberOfTokens);
	}

	function endSale() public {
		require(msg.sender == admin);
		require(tokenContract.transfer(admin, tokenContract.balanceOf(this)));

		// transfer balance to the admin
		admin.transfer(address(this).balance);
	}

}