var Health = artifacts.require("./Health.sol");

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
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
        cpf : 00000000001,
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
        return inst.ConsultaConsumo.call(consumo.cpf);
    }).then(function(result) {
        assert.equal(consumo.farmacia, result[0], "farmacia nao está igual");
        assert.equal(consumo.id, result[1], "id lote não está igual");
        assert.equal(consumo.quantidade, result[2], "quantidade não está igual");
        assert.equal(consumo.crm_medico, result[3], "crm medico não está igual");
        assert.equal(false, result[4], "validado errado");
        assert.equal(true, result[5], "não foi consumido");
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
        cpf : 00000000002,
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
        cpf : 00000000003,
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