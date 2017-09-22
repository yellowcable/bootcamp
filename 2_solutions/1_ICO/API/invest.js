var SocialICO = artifacts.require("SocialICO");

module.exports = function(done) {
  SocialICO.deployed().then(function(instance) {
    instance.sendTransaction({from: web3.eth.accounts[1], value: web3.toWei(10)});
    instance.sendTransaction({from: web3.eth.accounts[2], value: web3.toWei(10)});
    instance.sendTransaction({from: web3.eth.accounts[3], value: web3.toWei(10)});
    // return instance.Raised.call();
    // return instance.getBalance.call({from: web3.eth.accounts[2]});
    return instance.ContractBalance.call();
    // return instance.sendTransaction({from: web3.eth.accounts[1], value: web3.toWei(10)});
  }).then(function(result) {
    console.log(web3.fromWei(result));
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};