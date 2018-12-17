var NVCryptToken = artifacts.require("./NVCryptToken.sol");

contract('NVCryptToken', function(accounts) {
	const INITIAL_AMOUNT = 100000000000;
	const TRANSFER_AMOUNT = 40000;

	var tokenInstance;

	it('initializes the contract with the correct values', function() {
		return NVCryptToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.name();
		}).then(function(name) {
			assert.equal(name, 'NVCryptToken', 'has the correct name');
			return tokenInstance.symbol();
		}).then(function(symbol) {
			assert.equal(symbol, 'NVC', 'has the correct symbol');
			return tokenInstance.standard();
		}).then(function(standard) {
			assert.equal(standard, 'NVCryptToken v1.0', 'has the correct standard');
		});
	});

	it('allocates the initial supply upon deployment', function() {
		return NVCryptToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.totalSupply();
		}).then(function(totalSupply) {
			assert.equal(totalSupply.toNumber(), INITIAL_AMOUNT, 'sets the total supply to 100 billion');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(adminBalance) {
			assert.equal(adminBalance.toNumber(), INITIAL_AMOUNT, 'it allocates the initial supply to the admin account');
		});
	});

	it('transfers token ownership', function() {
		return NVCryptToken.deployed().then(function(instance) {
			tokenInstance = instance;
			return tokenInstance.transfer.call(accounts[1], INITIAL_AMOUNT + 1);
		}).then(assert.fail).catch(function(error) {
			assert(error.message.indexOf('revert') >= 0, 'error message must contain revert');
			return tokenInstance.transfer.call(accounts[1], TRANSFER_AMOUNT, {from: accounts[0]});
		}).then(function(success) {
			assert.equal(success, true, 'it returns true');
			return tokenInstance.transfer(accounts[1], TRANSFER_AMOUNT, {from: accounts[0]});
		}).then(function(receipt) {
			assert.equal(receipt.logs.length, 1, 'triggers one event');
			assert.equal(receipt.logs[0].event, 'Transfer', 'should be the "Transfer" event');
			assert.equal(receipt.logs[0].args._from, accounts[0], 'logs the account the tokens are transferred from');
			assert.equal(receipt.logs[0].args._to, accounts[1], 'logs the account the tokens are transferred to');
			assert.equal(receipt.logs[0].args._value, TRANSFER_AMOUNT, 'logs the transfer amount');
			return tokenInstance.balanceOf(accounts[1]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), 40000, 'adds the amount to the receiving account');
			return tokenInstance.balanceOf(accounts[0]);
		}).then(function(balance) {
			assert.equal(balance.toNumber(), INITIAL_AMOUNT - TRANSFER_AMOUNT, 'deducts the amount from balance of sending account');
		})
	});

})