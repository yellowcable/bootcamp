var Health = artifacts.require("./Health.sol");

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    var consumo = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      registro = {
        id : "LOTE1",
        dataFrabric : 20170920,
        empresa : "BAYER",
        validade : 20180920,
        quantidade : 50
      };

      return inst.Registro(registro.id, 
                           registro.dataFrabric,
                           registro.empresa,
                           registro.validade,
                           registro.quantidade, {from: web3.eth.coinbase});
    }).then(function(result) {
      consumo = {
        id : "LOTE1",
        farmacia : "FARMACONDE",
        crm_medico : "MEDICO",
        cpf : 00000000000,
        quantidade : 10,
        data: 20170921
      };

      return inst.Consumo(consumo.id, 
                           consumo.farmacia,
                           consumo.crm_medico,
                           consumo.cpf,
                           consumo.quantidade,
                           consumo.data, {from: web3.eth.coinbase});
    }).then(function(result) {
        return inst.Validacao(consumo.cpf,
                              consumo.id, {from: web3.eth.coinbase});
    }).then(function(result) {
        return inst.ConsultaValidacao.call(consumo.cpf);
    }).then(function(result) {
        assert.equal(true, result, "Não foi validado");
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
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
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
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
});