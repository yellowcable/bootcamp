pragma solidity ^0.4.13;

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

contract Agro {
	using SafeMath for uint256;
    
	address public owner;

	struct Animal {
		uint256 datRegistro;
		string produtor;
		//string idAnimal;
		string caracteristicaAnimal;
		string codRegistroMA;
		bool registrado;
		bool comprado;
	}

	struct Comprador {
		uint256 datCompra;
		string idAnimal;
		uint256 datBeneficiamento;
		//string codRegistroCompra;
		bool consumiu;
		bool validado;
	}

	event EventoRegistro(address indexed _who, string _idAnimal, uint256 _dataRegistro, string _produtor, string _caracteristicaAnimal, string _codRegistroMA);
	event EventoConsumo(string _idAnimal, uint256 _datCompra, uint256 _datBeneficiamento, string _codRegistroCompra);
	event EventoValidacao(string _codRegistroMA, string _idAnimal);
	
	mapping(string => Animal) listaAnimais;
	mapping(string => Comprador) listaCompradores;

	modifier onlyOwner() {
		require(msg.sender == owner);
		_;
	}

	function Agro() {
		owner = msg.sender;
	}
		
	function Registro(string p_id, uint256 p_dataRegistro, string p_produtor, string p_caracteristicaAnimal, string p_codRegistroMA) onlyOwner {
		require(!listaAnimais[p_id].registrado);
		
		listaAnimais[p_id].datRegistro = p_dataRegistro;
		listaAnimais[p_id].produtor = p_produtor;
		listaAnimais[p_id].caracteristicaAnimal = p_caracteristicaAnimal;
		listaAnimais[p_id].codRegistroMA = p_codRegistroMA;
		listaAnimais[p_id].registrado = true;
		listaAnimais[p_id].comprado = false;

		EventoRegistro(msg.sender, p_id, p_dataRegistro, p_produtor, p_caracteristicaAnimal, p_codRegistroMA);		
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, string, string, bool, bool) {
		return (listaAnimais[p_id].datRegistro,
				listaAnimais[p_id].produtor,
				listaAnimais[p_id].caracteristicaAnimal,
				listaAnimais[p_id].codRegistroMA,
				listaAnimais[p_id].registrado,
				listaAnimais[p_id].comprado);
	}

	function Consumo(string p_id, uint256 p_datCompra, uint256 p_datBeneficiamento, string p_codRegistroCompra) {	
		require(listaAnimais[p_id].registrado);
		require(!listaAnimais[p_id].comprado);
		require(!listaCompradores[p_codRegistroCompra].consumiu);
		require(p_datCompra > listaAnimais[p_id].datRegistro && p_datBeneficiamento > listaAnimais[p_id].datRegistro);

		listaCompradores[p_codRegistroCompra].datCompra = p_datCompra;
		listaCompradores[p_codRegistroCompra].idAnimal = p_id;
		listaCompradores[p_codRegistroCompra].datBeneficiamento = p_datBeneficiamento;
		listaCompradores[p_codRegistroCompra].validado = false;
		listaCompradores[p_codRegistroCompra].consumiu = true;

		listaAnimais[p_id].comprado = true;

		EventoConsumo(p_id, p_datCompra, p_datBeneficiamento, p_codRegistroCompra);
	}

	function ConsultaConsumo(string p_codRegistroCompra) constant returns (uint256, string, uint256, bool, bool) {
		return (listaCompradores[p_codRegistroCompra].datCompra,
				listaCompradores[p_codRegistroCompra].idAnimal,
				listaCompradores[p_codRegistroCompra].datBeneficiamento,
				listaCompradores[p_codRegistroCompra].validado,
				listaCompradores[p_codRegistroCompra].consumiu);
	}

	function Validacao(string p_codRegistroCompra, string p_id) {
		require(listaCompradores[p_codRegistroCompra].consumiu);
		require(sha3(listaCompradores[p_codRegistroCompra].idAnimal) == sha3(p_id));

		listaCompradores[p_codRegistroCompra].validado = true;

		EventoValidacao(p_codRegistroCompra, p_id);
	}

	function ConsultaValidacao(string p_codRegistroCompra) constant returns (bool) {
		return listaCompradores[p_codRegistroCompra].validado;
	}
}