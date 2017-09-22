var Agro = artifacts.require("./Agro.sol");

module.exports = function(deployer) {
  deployer.deploy(Agro);
};
