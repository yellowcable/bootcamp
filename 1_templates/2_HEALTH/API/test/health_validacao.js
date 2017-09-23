var Health = artifacts.require("./Health.sol");

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    var consumo = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      //realiza o registro de um asset
    }).then(function(result) {
      //realiza o consumo desse asset
    }).then(function(result) {
      //realiza a validacao desse consumo
    }).then(function(result) {
      //consulta a validacao
    }).then(function(result) {
      //verifica se o resultado é o resperado
    });
  });
  it("Não é permitido um não-consumidor validar.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;

      return inst.Validacao(000000002,
                              consumo.id, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Não foi permitida a validação");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
  it("Não é permitido validar algo que não foi consumido pelo validador.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;

      return inst.Validacao(consumo.cpf,
                              "LOTE2", {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Não foi permitida a validação");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
});