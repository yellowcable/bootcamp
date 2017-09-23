var Agro = artifacts.require("./Agro.sol");

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    var consumo = { };

    return Agro.deployed().then(function(instance) {
      inst = instance;

      //realiza o registro de um asset
    }).then(function(result) {
      //realiza o consumo do asset
    }).then(function(result) {
      //realiza a validacao desse consumo
    }).then(function(result) {
      //consulta a validacao desse consumo
    }).then(function(result) {
      //verifica se a validacao teve o resultado esperado
    });
  });
  it("Não é permitido validar um codigo de compra que náo foi realizada ainda", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;

      return inst.Validacao("000000002",
                              "BOI1", {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
  it("Não é permitido validar algo que não foi consumido.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
      
      return inst.Validacao("COMPRAHAS12",
                              "BOI2000", {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
});