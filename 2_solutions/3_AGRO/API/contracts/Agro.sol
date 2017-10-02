pragma solidity ^0.4.13;

contract Agro {
	using SafeMath for uint256;
    
	address public owner;

	struct Animal {
		uint256 dataRegistro;
		string produtor;
		string caracteristicaAnimal;
		string codRegistroMA;
		bool registrado;
		bool consumido;

		uint256 dataBeneficiamento;
		string codRegistroBeneficiamento;
	}

	struct Produto {
		uint256 dataCompra;
		string idAnimal;
		bool validado;
		uint256 rate; //0 a 10
	}

	event EventoRegistro(address indexed _who, string _idAnimal, uint256 _dataRegistro, string _produtor, string _caracteristicaAnimal, string _codRegistroMA);
	event EventoConsumo(string _idAnimal, uint256 _dataBeneficiamento, string _codRegistroBeneficiamento);
	event EventoValidacao(string _codRegistroMA, string _idAnimal, uint256 p_dataCompra, uint256 p_rate);
	
	mapping(string => Animal) listaAnimais; //lista por ID Animal
	mapping(string => Produto) listaConsumo; //lista por codRegistroBeneficiamento

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
		listaAnimais[p_id].consumido = false;

		listaAnimais[p_id].dataBeneficiamento = 0;
		listaAnimais[p_id].codRegistroBeneficiamento = "";

		EventoRegistro(msg.sender, p_id, p_dataRegistro, p_produtor, p_caracteristicaAnimal, p_codRegistroMA);		
	}

	function ConsultaRegistro(string p_id) constant returns (uint256, string, string, string, bool, bool) {
		return (listaAnimais[p_id].dataRegistro,
				listaAnimais[p_id].produtor,
				listaAnimais[p_id].caracteristicaAnimal,
				listaAnimais[p_id].codRegistroMA,
				listaAnimais[p_id].registrado,
				listaAnimais[p_id].consumido);
	}

	function Consumo(string p_id, uint256 p_dataBeneficiamento, string p_codRegistro) {	
		require(!(sha3(p_id) == sha3("")));
		require(!(p_dataBeneficiamento == 0));
		require(!(sha3(p_codRegistro) == sha3("")));
		require(listaAnimais[p_id].registrado);
		require(!listaAnimais[p_id].consumido);
		require(p_dataBeneficiamento > listaAnimais[p_id].dataRegistro);

		listaConsumo[p_codRegistro].dataCompra = 0;
		listaConsumo[p_codRegistro].idAnimal = p_id;
		listaConsumo[p_codRegistro].validado = false;

		listaAnimais[p_id].dataBeneficiamento = p_dataBeneficiamento;
		listaAnimais[p_id].codRegistroBeneficiamento = p_codRegistro;

		listaAnimais[p_id].consumido = true;

		EventoConsumo(p_id, p_dataBeneficiamento, p_codRegistro);
	}

	function ConsultaConsumo(string p_codRegistro) constant returns (uint256, string, uint256, bool, bool) {
		return (listaConsumo[p_codRegistro].dataCompra,
				listaConsumo[p_codRegistro].idAnimal,
				listaAnimais[listaConsumo[p_codRegistro].idAnimal].dataBeneficiamento,
				listaConsumo[p_codRegistro].validado,
				listaAnimais[listaConsumo[p_codRegistro].idAnimal].consumido);
	}

	function Validacao(uint256 p_rate, uint256 p_dataCompra, string p_codRegistro, string p_id) {
		require(listaAnimais[p_id].consumido);
		require(!listaConsumo[p_codRegistro].validado);
		require(p_rate >= 0);
		require(p_rate <= 10);
		require(sha3(listaConsumo[p_codRegistro].idAnimal) == sha3(p_id));
		require(p_dataCompra > listaAnimais[p_id].dataBeneficiamento);

		listaConsumo[p_codRegistro].validado = true;
		listaConsumo[p_codRegistro].dataCompra = p_dataCompra;
		listaConsumo[p_codRegistro].rate = p_rate;

		EventoValidacao(p_codRegistro, p_id, p_dataCompra, p_rate);
	}

	function ConsultaValidacao(string p_codRegistro) constant returns (uint256, uint256, bool) {
		return (listaConsumo[p_codRegistro].rate,
				listaConsumo[p_codRegistro].dataCompra,
				listaConsumo[p_codRegistro].validado);
	}

	function Consulta(string p_codRegistro, string p_id) constant returns (string, uint256, string, uint256, uint256, uint256) {
		return (p_id,
				listaAnimais[p_id].dataRegistro,
				p_codRegistro,
				listaAnimais[p_id].dataBeneficiamento,
				listaConsumo[p_codRegistro].dataCompra,
				listaConsumo[p_codRegistro].rate);
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