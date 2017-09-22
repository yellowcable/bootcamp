var SocialICO = artifacts.require("SocialICO");

module.exports = function(done) {
  SocialICO.deployed().then(function(instance) {
    console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0])));
    return instance.Drain({from: web3.eth.accounts[0]});
  }).then(function(result) {
    console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[0])));
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};