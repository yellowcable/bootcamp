var SocialICO = artifacts.require("SocialICO");

module.exports = function(done) {
  SocialICO.deployed().then(function(instance) {
    console.log(instance.CheckApproval.call());
    instance.Approve({from: web3.eth.accounts[1]});
    instance.Approve({from: web3.eth.accounts[2]});
    return instance.CheckApproval.call();
  }).then(function(aprovado) {
    console.log(aprovado);
    done();
  }).catch(function(e) {
    console.log(e);
    done();
  });
};