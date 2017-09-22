var Agro = artifacts.require("./Agro.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
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
    }).then(function(result) {
        return inst.ConsultaRegistro.call(registro.id);
    }).then(function(result) {
        assert.equal(registro.dataRegistro, result[0], "dataRegistro nao está igual");
        assert.equal(registro.produtor, result[1], "produtor não está igual");
        assert.equal(registro.caractAnimal, result[2], "caractAnimal não está igual");
        assert.equal(registro.codigoRegistroMA, result[3], "codigoRegistroMA não está igual");
        assert.equal(true, result[4], "consta como nao registrado");
        assert.equal(false, result[5], "consta como comprado");
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
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
});

