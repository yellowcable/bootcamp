var express = require('express');
var app = express();
var Web3 = require("web3");
var contract = require("truffle-contract");
var http = 'http://localhost:8545';

var provider = new Web3.providers.HttpProvider(http);

var web3 = new Web3(provider);


var contratojSON = require("./build/contracts/Health.json");
// Get the necessary contract artifact file and instantiate it with truffle-contract.
var contrato = contract(contratojSON);
// Set the provider for our contract.
contrato.setProvider(provider);

var contaRegistro = web3.eth.coinbase;

app.get('/api/registro', function(req, res) {
	var registro = {
        id : req.param('id'),
        dataFabric : req.param('dataFabric'),
        empresa : req.param('empresa'),
        validade : req.param('validade'),
        quantidade : req.param('quantidade')
	};

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Registro(registro.id, 
								  registro.dataFabric,
								  registro.empresa,
								  registro.validade,
								  registro.quantidade, {from: contaRegistro, gas: 400000})
	}).then(function (result) {
		res.send(result);
	}).catch(function(e) {
	    console.log(e);
	    res.send(e);
  	});
});

app.get('/api/consumo', function(req, res) {
	var	consumo = {
        id : req.param('id'),
        farmacia : req.param('farmacia'),
        crm_medico : req.param('crm_medico'),
        cpf : req.param('cpf'),
        quantidade : req.param('quantidade'),
        data: req.param('data')
	};

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Consumo(consumo.id, 
                           consumo.farmacia,
                           consumo.crm_medico,
                           consumo.cpf,
                           consumo.quantidade,
                           consumo.data, {from: contaRegistro, gas: 400000});
	}).then(function (result) {
		res.send(result)
	}).catch(function(e) {
	    console.log(e);
	    res.send(e);
  	});
});

app.get('/api/validacao', function(req, res) {
	var validacao = {
		id : req.param('id'),
		cpf : req.param('cpf'),
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Validacao(validacao.cpf,
                              validacao.id, {from: web3.eth.coinbase});
	}).then(function (result) {
		res.send(result);
	}).catch(function(e) {
	    console.log(e);
	    res.send(e);
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
					evento: _event.args,
					status: _event.event
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