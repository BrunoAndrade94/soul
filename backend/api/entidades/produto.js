module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const produto = { ...req.body };
			validacao.exiteOuErro(produto.nome, notificacao.nomeNaoInformado);
			validacao.exiteOuErro(produto.idEspecie, "especie nao informada!");
			validacao.exiteOuErro(produto.idUnidade, "unidade nao informada!");

			app.db(tabela.produtos)
				.insert(produto)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir };
};
