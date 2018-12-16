var NVCryptToken = artifacts.require("./NVCryptToken.sol");

module.exports = function(deployer) {
  deployer.deploy(NVCryptToken);
};
