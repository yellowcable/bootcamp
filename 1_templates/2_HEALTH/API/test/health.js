var Health = artifacts.require("./Health.sol");

contract('TU1 - Registro', function(accounts) {
  it("Dados foram registrados corretamente - Todos campos preenchidos", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido o registro do mesmo Lote ID duas vezes.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Falha: Todos os campos não foram preenchidos", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
});

contract('TU2 - Consumo', function(accounts) {
  it("Consumo ocorreu com sucesso", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido o consumo de uma quantidade maior do que a existente.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido o consumo de um lote que passou da validade.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
});

contract('TU3 - Validação', function(accounts) {
  it("Validacao ocorreu com sucesso.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido um não-consumidor validar.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
  it("Não é permitido validar algo que não foi consumido pelo validador.", function() {
    var inst;

    return Health.deployed().then(function(instance) {
      inst = instance;
    });
  });
});