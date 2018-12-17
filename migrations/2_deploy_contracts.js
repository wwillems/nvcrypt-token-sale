var NVCryptToken = artifacts.require("./NVCryptToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NVCryptToken, 100000000000);
};
