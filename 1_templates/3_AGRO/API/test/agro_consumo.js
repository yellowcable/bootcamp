var Agro = artifacts.require("./Agro.sol");

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      //realiza o registro de um asset
    }).then(function(result) {
      //realiza o consumo desse asset
    }).then(function(result) {
      //consulta o consumo, com seu retorno
    }).then(function(result) {
      //verifica se o retorno é o esperado. (todas variáveis iguais)
    });
  });
  it("Não é possível consumir algo que já foi consumido", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      consumo = {
        id : "BOI1",
        dataCompra : 20170921,
        dataBeneficiamento : 20170921,
        codRegistroCompra : "DOPPIEDOPIE"
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataCompra,
                           consumo.dataBeneficiamento,
                           consumo.codRegistroCompra, {from: web3.eth.coinbase});
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
        dataCompra : 20170919,
        dataBeneficiamento : 20170919,
        codRegistroCompra : "COMPRAHAS12"
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataCompra,
                           consumo.dataBeneficiamento,
                           consumo.codRegistroCompra, {from: web3.eth.coinbase});
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
        dataCompra : 0,
        dataBeneficiamento : 0,
        codRegistroCompra : ""
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataCompra,
                           consumo.dataBeneficiamento,
                           consumo.codRegistroCompra, {from: web3.eth.coinbase});
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
