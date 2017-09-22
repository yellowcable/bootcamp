var Health = artifacts.require("./Health.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
    var inst;
    var registro = {};

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
        return inst.ConsultaRegistro.call(registro.id);
    }).then(function(result) {
        assert.equal(registro.dataFrabric, result[0], "Data nao está igual");
        assert.equal(registro.empresa, result[1], "Empresa não está igual");
        assert.equal(registro.validade, result[2], "validade não está igual");
        assert.equal(registro.quantidade, result[3], "quantidade não está igual");
    });
  });
  it("Não é permitido o registro do mesmo Lote ID duas vezes.", function() {
    var inst;

    var registro = {};

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
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;
    //TODO
    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
});