pragma solidity ^0.4.13;

contract Agro {
	using SafeMath for uint256;
    
	address public owner;

	struct Animal {
		uint256 dataRegistro;
		string produtor;
		//string idAnimal;
		string caracteristicaAnimal;
		string codRegistroMA;
		bool registrado;
		bool comprado;
	}

	struct Comprador {
		uint256 dataCompra;
		string idAnimal;
		uint256 dataBeneficimento;
		//string codRegistroCompra;
		bool consumiu;
		bool validado;
	}

	event EventoRegistro(address indexed _who, string _idAnimal, uint256 _dataRegistro, string _produtor, string _caracteristicaAnimal, string _codRegistroMA);
	event EventoConsumo(string _idAnimal, uint256 _dataCompra, uint256 _dataBeneficimento, string _codRegistroCompra);
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
		require(!(sha3(p_id) == sha3("")));
		require(!(p_dataRegistro == 0));
		require(!(sha3(p_produtor) == sha3("")));
		require(!(sha3(p_caracteristicaAnimal) == sha3("")));
		require(!(sha3(p_codRegistroMA) == sha3("")));
		
		listaAnimais[p_id].dataRegistro = p_dataRegistro;
		listaAnimais[p_id].produtor = p_produtor;
		listaAnimais[p_id].caracteristicaAnimal = p_caracteristicaAnimal;
		listaAnimais[p_id].codRegistroMA = p_codRegistroMA;
		listaAnimais[p_id].registrado = true;
		listaAnimais[p_id].comprado = false;

		EventoRegistro(msg.sender, p_id, p_dataRegistro, p_produtor, p_caracteristicaAnimal, p_codRegistroMA);		
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, string, string, bool, bool) {
		return (listaAnimais[p_id].dataRegistro,
				listaAnimais[p_id].produtor,
				listaAnimais[p_id].caracteristicaAnimal,
				listaAnimais[p_id].codRegistroMA,
				listaAnimais[p_id].registrado,
				listaAnimais[p_id].comprado);
	}

	function Consumo(string p_id, uint256 p_dataCompra, uint256 p_dataBeneficimento, string p_codRegistroCompra) {	
		require(!(sha3(p_id) == sha3("")));
		require(!(p_dataCompra == 0));
		require(!(p_dataBeneficimento == 0));
		require(!(sha3(p_codRegistroCompra) == sha3("")));
		require(listaAnimais[p_id].registrado);
		require(!listaAnimais[p_id].comprado);
		require(!listaCompradores[p_codRegistroCompra].consumiu);
		require(p_dataCompra > listaAnimais[p_id].dataRegistro && p_dataBeneficimento > listaAnimais[p_id].dataRegistro);

		listaCompradores[p_codRegistroCompra].dataCompra = p_dataCompra;
		listaCompradores[p_codRegistroCompra].idAnimal = p_id;
		listaCompradores[p_codRegistroCompra].dataBeneficimento = p_dataBeneficimento;
		listaCompradores[p_codRegistroCompra].validado = false;
		listaCompradores[p_codRegistroCompra].consumiu = true;

		listaAnimais[p_id].comprado = true;

		EventoConsumo(p_id, p_dataCompra, p_dataBeneficimento, p_codRegistroCompra);
	}

	function ConsultaConsumo(string p_codRegistroCompra) constant returns (uint256, string, uint256, bool, bool) {
		return (listaCompradores[p_codRegistroCompra].dataCompra,
				listaCompradores[p_codRegistroCompra].idAnimal,
				listaCompradores[p_codRegistroCompra].dataBeneficimento,
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