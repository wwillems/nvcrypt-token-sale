pragma solidity ^0.4.2;

contract NVCryptToken {
	uint256 public totalSupply;

	function NVCryptToken() public {
		totalSupply = 100000000000; // 100 billion tokens
	}
}