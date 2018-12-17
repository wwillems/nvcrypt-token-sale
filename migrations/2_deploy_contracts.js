var NVCryptToken = artifacts.require("./NVCryptToken.sol");
var NVCryptTokenSale = artifacts.require("./NVCryptTokenSale.sol");

module.exports = function(deployer) {
  deployer.deploy(NVCryptToken, 100000000000).then(function() {
  	//Token price is 0.001 ether
  	var tokenPrice = 1000000000000000;
  	return deployer.deploy(NVCryptTokenSale, NVCryptToken.address, tokenPrice);
  });
  
};
