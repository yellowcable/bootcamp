var Agro = artifacts.require("./Agro.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido o registro do mesmo animal (ID) duas vezes.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
});

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é possível consumir algo que já foi consumido", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Consumo com campos faltantes não é permitido.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
});

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido validar um codigo de compra que náo foi realizada ainda", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido validar algo que não foi consumido.", function() {
    var inst;

    return Agro.deployed().then(function(instance) {
      inst = instance;
    });
  });
});