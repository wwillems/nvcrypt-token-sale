pragma solidity ^0.4.2;

import "./NVCryptToken.sol";

contract NVCryptTokenSale {
	address admin;
	NVCryptToken public tokenContract;
	uint256 public tokenPrice;

	constructor (NVCryptToken _tokenContract, uint256 _tokenPrice) public {
		admin = msg.sender;
		tokenContract = _tokenContract;
		tokenPrice = _tokenPrice;
	}
	
}