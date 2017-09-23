pragma solidity ^0.4.13;

contract Agro {
	using SafeMath for uint256;
    
	address public owner;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function Agro() {
		owner = msg.sender;
	}
		
	function Registro(string p_id, uint256 p_dataRegistro, string p_produtor, string p_caracteristicaAnimal, string p_codRegistroMA) {		
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, string, string, bool, bool) {
	}

	function Consumo(string p_id, uint256 p_datCompra, uint256 p_datBeneficiamento, string p_codRegistroCompra) {		
	}

	function ConsultaConsumo(string p_codRegistroCompra) constant returns (uint256, string, uint256, bool, bool) {
	}

	function Validacao(string p_codRegistroCompra, string p_id) {
	}

	function ConsultaValidacao(string p_codRegistroCompra) constant returns (bool) {
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