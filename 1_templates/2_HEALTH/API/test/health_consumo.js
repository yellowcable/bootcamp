var Health = artifacts.require("./Health.sol");

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;
    var consumo = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      //realiza o registro de um asset
    }).then(function(result) {
      //realiza o consumo desse asset
    }).then(function(result) {
      //consulta o consumo do asset
    }).then(function(result) {
      //verifica se o consumo foi realizado. (variaveis de retorno iguais a de entrada)
    });
  });
  it("Não é permitido o consumo de uma quantidade maior do que a existente.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;

      consumo = {
        id : "LOTE1",
        farmacia : "FARMACONDE",
        crm_medico : "MEDICO",
        cpf : 00000000001,
        quantidade : 41,
        data: 20170921
      };

      return inst.Consumo(consumo.id, 
                           consumo.farmacia,
                           consumo.crm_medico,
                           consumo.cpf,
                           consumo.quantidade,
                           consumo.data, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Não foi permitido o consumo");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Não é permitido o consumo de um lote que passou da validade.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;

      consumo = {
        id : "LOTE1",
        farmacia : "FARMACONDE",
        crm_medico : "MEDICO",
        cpf : 00000000002,
        quantidade : 41,
        data: 20180922
      };

      return inst.Consumo(consumo.id, 
                           consumo.farmacia,
                           consumo.crm_medico,
                           consumo.cpf,
                           consumo.quantidade,
                           consumo.data, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Não foi permitido o consumo");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});