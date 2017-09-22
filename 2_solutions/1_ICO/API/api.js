var express = require('express');
var app = express();
var Web3 = require("web3");
var contract = require("truffle-contract");
var http = 'http://localhost:8545';

var provider = new Web3.providers.HttpProvider(http);

var web3 = new Web3(provider);

var contratojSON = require("./build/contracts/SocialICO.json");
// Get the necessary contract artifact file and instantiate it with truffle-contract.
var contrato = contract(contratojSON);
// Set the provider for our contract.
contrato.setProvider(provider);

app.get('/api/investir', function(req, res) {
	var data = {
		from:  req.param('from'),
		amount: req.param('amount')
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;
		
		return instancia.sendTransaction({from: data.from, value: web3.toWei(data.amount), gas: 124181});
	}).then(function (result) {
		res.send(result);
	}).catch(function(e) {
	    console.log(e);
	    res.send(e);
  	});
});

app.get('/api/aprovar', function(req, res) {
	var data = {
		from:  req.param('from')
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Approve({from: data.from});
	}).then(function (result) {
		res.send(result);
	});
});

app.get('/api/consultar', function(req, res) {
	var data = {
		from:  req.param('from')
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.getBalance.call({from: data.from});
	}).then(function (balance) {
		res.send(web3.fromWei(balance));
	});
});

app.get('/api/checar-aprovacao', function(req, res) {
	var data = {
		from:  req.param('from')
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.CheckApproval.call();
	}).then(function (result) {
		console.log(result);
		res.send(result);
	});
});

app.get('/api/liquidar', function(req, res) {
	var data = {
		from:  req.param('from')
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Drain({from: web3.eth.coinbase});
	}).then(function (result) {
		res.send(result);
	});
});

app.get('/api/consultar-caixa', function(req, res) {
	var empresa = web3.eth.coinbase
	var caixa = web3.fromWei(web3.eth.getBalance(empresa));

	res.send(caixa);
});

app.get('/api/eventos', function(req, res) {
	var data = {
		from:  req.param('from')
	}

	var instancia;

contrato.deployed().then(function(instance) {
    inst = instance;
    myEvent =  inst.allEvents({fromBlock: '0', toBlock: 'latest'});

    var hist = [];

    myEvent.get(function(error, result){
      if (error) {
      	res.send(error);
      } else {
        myEvent.stopWatching();
        console.log(result[0])
        result.forEach(function(_event) {
			var event = {
				type: _event.event,
				who:  _event.args._who,
				amount: web3.fromWei(parseInt(_event.args._amount))
			}
			hist.push(event);
		});
        res.send(hist);
      }
    });
  })
});

app.listen(3000);
console.log('Running on 3000...');