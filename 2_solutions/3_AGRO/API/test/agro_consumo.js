var Agro = artifacts.require("./Agro.sol");

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;
    var consumo = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      var registro = {
        id : "BOI1",
        dataRegistro : 20170920,
        produtor : "REI DO GADO",
        caractAnimal : "PRETO",
        codigoRegistroMA : "BP171"
      };

      return inst.Registro(registro.id, 
                           registro.dataRegistro,
                           registro.produtor,
                           registro.caractAnimal,
                           registro.codigoRegistroMA, {from: web3.eth.coinbase});
    }).then(function(result) {
      consumo = {
        id : "BOI1",
        dataCompra : 20170921,
        dataBeneficiamento : 20170921,
        codRegistroCompra : "COMPRAHAS12"
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataCompra,
                           consumo.dataBeneficiamento,
                           consumo.codRegistroCompra, {from: web3.eth.coinbase});
    }).then(function(result) {
        return inst.ConsultaConsumo.call(consumo.codRegistroCompra);
    }).then(function(result) {
        assert.equal(consumo.dataCompra, result[0], "dataCompra nao está igual");
        assert.equal(consumo.id, result[1], "id não está igual")
        assert.equal(consumo.dataBeneficiamento, result[2], "dataBeneficiamento  não está igual");;
        assert.equal(false, result[3], "validado errado");
        assert.equal(true, result[4], "não foi consumido");
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
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
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
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Consumo com campos faltantes não é permitido.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
});
