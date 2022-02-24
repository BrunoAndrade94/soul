module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;

	function existeOuErro(valor, erro) {
		if (!valor) throw notificacao.atencao + erro;
		if (Array.isArray(valor) && valor.length === 0)
			throw notificacao.atencao + erro;
		if (typeof valor === "string" && !valor.trim())
			throw notificacao.atencao + erro;
	}

	function naoExisteOuErro(valor, erro) {
		try {
			existeOuErro(valor, erro);
		} catch (erro) {
			return;
		}
		throw notificacao.atencao + erro;
	}

	function igualOuErro(valor1, valor2, erro) {
		if (valor1 !== valor2) throw notificacao.atencao + erro;
	}

	function numeroOuErro(valor, erro) {
		if (!Number(valor)) throw notificacao.atencao + erro;
	}

	function objetoVazio(objeto) {
		return (
			Object.keys(objeto).length === 0 && objeto.constructor === Object
		);
	}

	return {
		existeOuErro,
		naoExisteOuErro,
		igualOuErro,
		numeroOuErro,
		objetoVazio,
	};
};
