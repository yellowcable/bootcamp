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
	var registro = {
		id : req.param('id'),
		dataRegistro : req.param('dataRegistro'),
		produtor : req.param('produtor'),
		caractAnimal : req.param('caractAnimal'),
		codigoRegistroMA : req.param('codigoRegistroMA'),
	};

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Registro(registro.id, 
								  registro.dataRegistro,
								  registro.produtor,
								  registro.caractAnimal,
								  registro.codigoRegistroMA, {from: contaRegistro, gas: 400000})
	}).then(function (result) {
		res.send(result);
	}).catch(function(e) {
	    console.log(e);
	    res.send(e);
  	});
});

app.get('/api/consumo', function(req, res) {
	var consumo = {
        id : req.param('id'),
        dataCompra : req.param('dataCompra'),
        dataBeneficiamento : req.param('dataBeneficiamento'),
        codRegistroCompra : req.param('codRegistroCompra')
     };

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Consumo(consumo.id, 
                           consumo.dataCompra,
                           consumo.dataBeneficiamento,
                           consumo.codRegistroCompra, {from: contaRegistro, gas: 400000});
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
		codRegistroCompra : req.param('codRegistroCompra'),
	}

	var instancia;

	contrato.deployed().then(function(instance) {
		instancia = instance;

		return instancia.Validacao(validacao.codRegistroCompra,
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