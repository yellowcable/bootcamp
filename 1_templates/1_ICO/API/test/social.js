var SocialICO = artifacts.require("./SocialICO.sol");

contract('TU1', function(accounts) {
  it("Dar um Ether em troca de 2 SocialCoins", function() {
    var inst;

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return instance.sendTransaction({from: accounts[0], value: 1});
    }).then(function(result) {
      return inst.getBalance.call({from: accounts[0]});
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 2, "Nao recebeu 2 SocialCoins");
    });
  });
  it("Testar um investimento total de 30 ETHs", function() {
    var inst;

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return instance.sendTransaction({from: web3.eth.accounts[1], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: web3.eth.accounts[2], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: web3.eth.accounts[3], value: web3.toWei(5)});
    }).then(function(result) {
      return inst.Raised.call();
    }).then(function(result) {
      assert.equal(web3.fromWei(parseInt(result)), 25, "Nao foram investidos 25 ETHs");
    });
  });
});

contract('TU2', function(accounts) {
  it("Três investidores vão investir 10 ETH, e um quarto vai tentar investir mais 1", function() {
    var inst;

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return instance.sendTransaction({from: accounts[1], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[2], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[3], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[4], value: web3.toWei(1)});
    }).then(function(result) {
      return inst.getBalance.call({from: accounts[4]});
    }).then(function(balance) {
      assert.equal(balance.valueOf(), 31, "4 Investidor não pode ter realizado o investimento");
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});

contract('TU3', function(accounts) {
  it("Quem nao eh investidor, nao pode aprovar", function() {
    var inst;

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return instance.sendTransaction({from: accounts[1], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.Approve({from: web3.eth.accounts[1]});
    }).then(function(result) {
      return inst.Approve({from: web3.eth.accounts[2]});
    }).catch(function(error) {
      if(error.toString().indexOf("opcode") != -1) {
        console.log("We were expecting a Solidity throw (aka an invalid opcode), we got one. Test succeeded.");
      } else {
        // if the error is something else (e.g., the assert from previous promise), then we fail the test
        assert(false, error.toString());
      }
    });
  });
});

contract('TU4', function(accounts) {
  it("Aprovada liberação de verba mediante mais que 50% de aprovação baseada em stakeholder", function() {
    var inst;

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return instance.sendTransaction({from: accounts[1], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[2], value: web3.toWei(10)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[3], value: web3.toWei(5)});
    }).then(function(result) {
      return inst.sendTransaction({from: accounts[4], value: web3.toWei(5)});
    }).then(function(result) {
      return inst.Approve({from: web3.eth.accounts[1]});
    }).then(function(result) {
      return inst.Approve({from: web3.eth.accounts[3]});
    }).then(function(result) {
      return inst.CheckApproval.call();
    }).then(function(aprovado) {
      assert.equal(aprovado, true, "Nao foi aprovado mediante mais que 50%");
    });
  });
  it("Empresa retira ETHs investidos depois de aprovacao", function() {
    var inst;

    var saldo_empresa_antes = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));

    return SocialICO.deployed().then(function(instance) {
      inst = instance;
      return inst.Drain({from: web3.eth.coinbase});
    }).then(function(result) {
      return inst.ContractBalance.call();
    }).then(function(balance) {
      var saldo_empresa_depois = web3.fromWei(web3.eth.getBalance(web3.eth.coinbase));
      var delta = parseInt(saldo_empresa_depois) - parseInt(saldo_empresa_antes);

      assert.equal(delta, 30, "Contrato tem que estar zerado");
    });
  });
});