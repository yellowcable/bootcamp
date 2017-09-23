var Agro = artifacts.require("./Agro.sol");

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    var consumo = { };

    return Agro.deployed().then(function(instance) {
      inst = instance;

        //realiza o registro do asset
    }).then(function(result) {
        //realiza o consumo do asset recem criado
    }).then(function(result) {
        //realiza a validacao do asset recem consumido
    }).then(function(result) {
        //consulta a validacao
    }).then(function(result) {
        //verifica se os dados de retorno estao iguais os dados de entrada
    });
  });
  it("Nao é permitido a validacao com data compra menor que data de beneficiamento", function() {
    var inst;

    var consumo = { };

    return Agro.deployed().then(function(instance) {
      inst = instance;

      var registro = {
        id : "BOI2",
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
        id : "BOI2",
        dataBeneficiamento : 20170921,
        codRegistro : "COMPRAHAS13",
        rate: 5,
        dataCompra: 2017020
      };

      return inst.Consumo(consumo.id, 
                           consumo.dataBeneficiamento,
                           consumo.codRegistro, {from: web3.eth.coinbase});
    }).then(function(result) {
        return inst.Validacao(consumo.rate, consumo.dataCompra, consumo.codRegistro, consumo.id, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Validacao nao foi permitida");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
  it("Não é permitido validar um codigo de compra que náo foi realizada ainda", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;

      return inst.Validacao(5, 20170922, "000000002",
                              "BOI1", {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Validacao nao foi permitida");
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
      
      return inst.Validacao(5, 20170922, "COMPRAHAS12",
                              "BOI2000", {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Validacao nao foi permitida");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });;
  });
});