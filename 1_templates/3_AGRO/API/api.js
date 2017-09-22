var express = require('express');
var app = express();
var Web3 = require("web3");
var contract = require("truffle-contract");
var http = 'http://localhost:8545';

var provider = new Web3.providers.HttpProvider(http);

var web3 = new Web3(provider);


var contratojSON = require("./build/contracts/Agro.json");
// Get the necessary contract artifact file and instantiate it with truffle-contract.
var contrato = contract(contratojSON);
// Set the provider for our contract.
contrato.setProvider(provider);

var contaRegistro = web3.eth.coinbase;

app.get('/api/registro', function(req, res) {
	var v_dados = { }

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = intance;

		return instancia.Registro(/*"parametros"*/, {from: contaRegistro})
	}).then(function (result) {
		res.send(result);
	});
});

app.get('/api/consumo', function(req, res) {
	var v_dados = { }

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = intance;

		return instancia.Consumo(/*"parametros"*/, {from: /*"consumidor"*/ })
	}).then(function (result) {
		res.send(result)
	});
});

app.get('/api/validacao', function(req, res) {
	var v_dados = { }

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = intance;

		return instancia.Validacao(/*"parametros"*/, {from: /*"consumidor"*/ })
	}).then(function (result) {
		res.send(result);
	});
});

app.get('/api/consulta', function(req, res) {
	var v_dados = { }

	var instancia;

	contrato.deployed().then(function(instance) {
	    instancia = instance;

	    myEvent =  instancia.allEvents({fromBlock: '0', toBlock: 'latest'});

	    var hist = [];

	    myEvent.get(function(error, result){
	      if (error) {
	      	res.send(error);
	      } else {
	        myEvent.stopWatching();
	        result.forEach(function(_event) {
				var event = {
					/*"parametros"*/
				}
				hist.push(event);
			});
	        res.send(hist);
	      }
	    });
	});
});

app.listen(3000);
console.log('Running on 3000...');