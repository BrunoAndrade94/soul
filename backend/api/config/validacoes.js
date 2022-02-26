module.exports = (app) => {
	const n = app.api.config.notificacoes;

	function existeOuErro(valor, erro) {
		if (!valor) throw erro;
		if (Array.isArray(valor) && valor.length === 0) throw erro;
		if (typeof valor === "string" && !valor.trim()) throw erro;
	}

	function naoExisteOuErro(valor, erro) {
		try {
			existeOuErro(valor, erro);
		} catch (erro) {
			return;
		}
		throw erro;
	}

	function igualOuErro(valor1, valor2, erro) {
		if (valor1 !== valor2) throw erro;
	}

	function numeroOuErro(valor, erro) {
		if (!Number(valor) || Number(valor) < 0) throw erro;
	}

	function éNumero(valor) {
		return Number(valor);
	}

	function objetoVazio(objeto) {
		return (
			Object.keys(objeto).length === 0 && objeto.constructor === Object
		);
	}

	function objetoNaoVazioOuErro(objeto, erro) {
		if (objetoVazio(objeto)) throw erro;
	}

	function stringVazia(string) {
		return !string || string === undefined;
	}

	return {
		existeOuErro,
		naoExisteOuErro,
		igualOuErro,
		numeroOuErro,
		éNumero,
		objetoVazio,
		objetoNaoVazioOuErro,
		stringVazia,
	};
};
