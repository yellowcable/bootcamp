var Health = artifacts.require("./Health.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
    var inst;
    var registro = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      //realiza o registro de um asset
    }).then(function(result) {
      //consulta o registro de um asset 
    }).then(function(result) {
      //compara o retorno para validar. (todas as variaveis iguais)
    });
  });
  it("Data de fabricacao nao pode ser maior que a data de validade.", function() {
    var inst;

    var registro = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      registro = {
        id : "LOTE1",
        dataFrabric : 20170920,
        empresa : "BAYER",
        validade : 20170919,
        quantidade : 50
      };

      return inst.Registro(registro.id, 
                           registro.dataFrabric,
                           registro.empresa,
                           registro.validade,
                           registro.quantidade, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Não foi permitido o registro");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
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
        console.log("Não foi permitido o registro");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;

    var registro = {};

    return Health.deployed().then(function(instance) {
      inst = instance;

      registro = {
        id : "",
        dataFrabric : 20170920,
        empresa : "",
        validade : 20180920,
        quantidade : 0
      };

      return inst.Registro(registro.id, 
                           registro.dataFrabric,
                           registro.empresa,
                           registro.validade,
                           registro.quantidade, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Erro esperado, não podemos realizar um registro com valores em branco ou zerados/nulos");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});