pragma solidity ^0.4.13;

contract Health {
	using SafeMath for uint256;
    
	address public owner;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function Health() {
		owner = msg.sender;
	}
		
	function Registro(string p_id, uint256 p_dataFabric, string p_empresa, uint256 p_validade, uint256 p_qtd) onlyOwner {		
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, uint256, uint256, uint256, bool) {
	}

	function Consumo(string p_id, string p_farmacia, string p_crm_medico, uint256 p_cpf, uint256 p_qtd, uint256 p_data) {		
	}

	function ConsultaRegistro(uint256 p_cpf) constant returns (string, string, uint256, string, bool, bool) {
	}

	function Validacao(uint256 p_cpf, string p_id) {
	}

	function ConsultaValidacao(uint256 p_cpf) constant returns (bool)) {
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