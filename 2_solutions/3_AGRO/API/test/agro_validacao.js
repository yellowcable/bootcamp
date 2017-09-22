var Agro = artifacts.require("./Agro.sol");

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    var consumo = { };

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
        return inst.Validacao(consumo.codRegistroCompra, consumo.id, {from: web3.eth.coinbase});
    }).then(function(result) {
        return inst.ConsultaValidacao.call(consumo.codRegistroCompra);
    }).then(function(result) {
        assert.equal(true, result, "Não foi validado");
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