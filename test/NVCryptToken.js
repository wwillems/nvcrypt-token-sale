var NVCryptToken = artifacts.require("./NVCryptToken.sol");

contract('NVCryptToken', function(accounts) {
	it('sets the total supply upon deployment', function() {
		return NVCryptToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), 100000000000, 'sets the total supply to 100 billion');
		});
	});
})