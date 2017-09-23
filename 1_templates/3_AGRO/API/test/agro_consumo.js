var Agro = artifacts.require("./Agro.sol");

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

        //realiza o registro do asset
    }).then(function(result) {
        //realiza o consumo do registro recem criado
    }).then(function(result) {
        //consulta o consumo
    }).then(function(result) {
        //verifica se os dados de retorno estao iguais com os de entrada
    });
  });
  it("Não é possível consumir algo que já foi consumido", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      consumo = {
        id : "BOI1",
        dataBeneficiamento : 20170921,
        codRegistro : "DOPPIEDOPIE"
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataBeneficiamento,
                           consumo.codRegistro, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Consumo não permitido.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Náo é possivel consumir com data inferior a de registro", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      var registro = {
        id : "BOI2",
        dataRegistro : 20170920,
        produtor : "REI DO GADO",
        caractAnimal : "PRETO",
        codigoRegistroMA : "BP172"
      };

      return inst.Registro(registro.id, 
                           registro.dataRegistro,
                           registro.produtor,
                           registro.caractAnimal,
                           registro.codigoRegistroMA, {from: web3.eth.coinbase});
    }).then(function(result) {
      consumo = {
        id : "BOI2",
        dataBeneficiamento : 20170919,
        codRegistro : "COMPRAHAS12"
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataBeneficiamento,
                           consumo.codRegistro, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Consumo não permitido");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Consumo com campos faltantes não é permitido.", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      var registro = {
        id : "BOI2",
        dataRegistro : 20170920,
        produtor : "REI DO GADO",
        caractAnimal : "PRETO",
        codigoRegistroMA : "BP172"
      };

      return inst.Registro(registro.id, 
                           registro.dataRegistro,
                           registro.produtor,
                           registro.caractAnimal,
                           registro.codigoRegistroMA, {from: web3.eth.coinbase});
    }).then(function(result) {
      consumo = {
        id : "",
        dataBeneficiamento : 0,
        codRegistro : ""
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataBeneficiamento,
                           consumo.codRegistro, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Consumo não permitido");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});
