# nvcrypt-token-sale


Interact with token contract via truffle console:

NVCryptToken.deployed().then(function(instance) { tokenInstance = instance; })
tokenInstance.name();
tokenInstance.symbol();
tokenInstance.standard();

tokenInstance.totalSupply().then(function(totalSupply) { supply=totalSupply; })
supply.toNumber();

web3.eth.accounts();

admin = web3.eth.accounts[0];

tokenInstance.balanceOf(admin).then(function(bal) { balance=bal; });
balance.toNumber();

receiver = web3.eth.accounts[1]; tokenInstance.transfer(receiver, 1, { from:admin; })
tokenInstance.balanceOf(admin);
tokenInstance.balanceOf(receiver)
tokenInstance.approve(web3.eth.accounts[1],100)
tokenInstance.allowance(web3.eth.accounts[0], web3.eth.accounts[1])
fromAccount = web3.eth.accounts[2];
toAccount = web3.eth.accounts[3];
spendingAccount = web3.eth.accounts[4];
tokenInstance.transfer(fromAccount, 100, {from:web3.eth.accounts[0]})
tokenInstance.balanceOf(fromAccount)
tokenInstance.approve(spendingAccount, 10, {from:fromAccount})
tokenInstance.transferFrom(fromAccount, toAccount, 10, {from:spendingAccount})
tokenInstance.balanceOf(fromAccount)
tokenInstance.balanceOf(toAccount)
tokenInstance.allowance(fromAccount)
tokenInstance.allowance(fromAccount, spendingAccount))













