pragma solidity ^0.4.13;

contract Health {
	using SafeMath for uint256;
    
	address public owner;

	struct Lote {
		uint256 dataFabric;
		string empresa;
		uint256 validade;
		uint256 qtd;
		uint256 qtdConsumida;
		bool registrado;
	}

	struct Consumidor {
		string farmarcia;
		string loteID;
		uint256 qtd;
		string crm_medico;
		bool consumiu;
		bool validado;
	}

	event EventoRegistro(address indexed _who, string _idLote, uint256 _dataFabric, string _empresa, uint256 _validade, uint256 _qtd);
	event EventoConsumo(string _farmacia, string _crm_medico, uint256 _cpf, string _idLote, uint256 _qtd, uint256 _data);
	event EventoValidacao(uint256 _cpf, string _idLote);

	mapping(string => Lote) listaLotes;
	mapping(uint256 => Consumidor) listaConsumidores;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function Health() {
		owner = msg.sender;
	}
		
	function Registro(string p_id, uint256 p_dataFabric, string p_empresa, uint256 p_validade, uint256 p_qtd) onlyOwner {	
		require(!listaLotes[p_id].registrado);
		require(!(sha3(p_id) == sha3("")));
		require(!(p_dataFabric == 0));
		require(!(sha3(p_empresa) == sha3("")));
		require(!(p_validade == 0));
		require(!(p_qtd == 0));
		require(p_dataFabric < p_validade);
		
		listaLotes[p_id].dataFabric = p_dataFabric;
		listaLotes[p_id].empresa = p_empresa;
		listaLotes[p_id].validade = p_validade;
		listaLotes[p_id].qtd = p_qtd;
		listaLotes[p_id].qtdConsumida = 0;
		listaLotes[p_id].registrado = true;

		EventoRegistro(msg.sender, p_id, p_dataFabric, p_empresa, p_validade, p_qtd);
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, uint256, uint256, uint256, bool) {
		return (listaLotes[p_id].dataFabric,
				listaLotes[p_id].empresa,
				listaLotes[p_id].validade,
				listaLotes[p_id].qtd,
				listaLotes[p_id].qtdConsumida,
				listaLotes[p_id].registrado);
	}

	function Consumo(string p_id, string p_farmacia, string p_crm_medico, uint256 p_cpf, uint256 p_qtd, uint256 p_data) {	
		require(listaLotes[p_id].registrado);
		require(!listaConsumidores[p_cpf].consumiu);
		require(p_data < listaLotes[p_id].validade && p_qtd <= (listaLotes[p_id].qtd - listaLotes[p_id].qtdConsumida));
		require(!(sha3(p_id) == sha3("")));
		require(!(sha3(p_farmacia) == sha3("")));
		require(!(sha3(p_crm_medico) == sha3("")));
		require(!(p_cpf == 0));
		require(!(p_qtd == 0));
		require(!(p_data == 0));

		uint256 qtdConsumida = listaLotes[p_id].qtdConsumida;

		listaLotes[p_id].qtdConsumida = qtdConsumida.plus(p_qtd);

		listaConsumidores[p_cpf].farmarcia = p_farmacia;
		listaConsumidores[p_cpf].loteID = p_id;
		listaConsumidores[p_cpf].qtd = p_qtd;
		listaConsumidores[p_cpf].crm_medico = p_crm_medico;
		listaConsumidores[p_cpf].validado = false;
		listaConsumidores[p_cpf].consumiu = true;

		EventoConsumo(p_farmacia, p_crm_medico, p_cpf, p_id, p_qtd, p_data);
	}

	function ConsultaConsumo(uint256 p_cpf) constant returns (string, string, uint256, string, bool, bool) {
		return (listaConsumidores[p_cpf].farmarcia,
				listaConsumidores[p_cpf].loteID,
				listaConsumidores[p_cpf].qtd,
				listaConsumidores[p_cpf].crm_medico,
				listaConsumidores[p_cpf].validado,
				listaConsumidores[p_cpf].consumiu);
	}

	function Validacao(uint256 p_cpf, string p_id) {
		require(listaConsumidores[p_cpf].consumiu);
		require(sha3(listaConsumidores[p_cpf].loteID) == sha3(p_id));

		listaConsumidores[p_cpf].validado = true;

		EventoValidacao(p_cpf, p_id);
	}

	function ConsultaValidacao(uint256 p_cpf) constant returns (bool) {
		return listaConsumidores[p_cpf].validado;
	}
}

library SafeMath {
	function times(uint256 x, uint256 y) internal returns (uint256) {
		uint256 z = x * y;
		assert(x == 0 || (z / x == y));
		return z;
	}
	
	function plus(uint256 x, uint256 y) internal returns (uint256) {
		uint256 z = x + y;
		assert(z >= x && z >= y);
		return z;
	}

  	function div(uint256 a, uint256 b) internal constant returns (uint256) {
	    // assert(b > 0); // Solidity automatically throws when dividing by 0
	    uint256 c = a / b;
	    // assert(a == b * c + a % b); // There is no case in which this doesn't hold
	    return c;
  	}
}