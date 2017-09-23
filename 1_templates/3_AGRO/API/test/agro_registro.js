var Agro = artifacts.require("./Agro.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
    var inst;
    var registro = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      //Incluir registro 
    }).then(function(result) {
      //incluir consulta do registro
    }).then(function(result) {
      //validar se o retorno é igual. (todas as variáveis sao iguais)
    });
  });
  it("Não é permitido o registro do mesmo animal (ID) duas vezes.", function() {
    var inst;

    var registro = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      registro = {
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
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Registro não permitido");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;

    var registro = {};

    return Agro.deployed().then(function(instance) {
      inst = instance;

      registro = {
        id : "",
        dataRegistro : 0,
        produtor : "",
        caractAnimal : "",
        codigoRegistroMA : ""
      };

      return inst.Registro(registro.id, 
                           registro.dataRegistro,
                           registro.produtor,
                           registro.caractAnimal,
                           registro.codigoRegistroMA, {from: web3.eth.coinbase});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("Registro não permitido");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});

