module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const produto = { ...req.body };

			validacao.existeOuErro(produto.nome, notificacao.nomeNaoInformado);
			validacao.existeOuErro(
				produto.idEspecie,
				notificacao.especieNaoInformada
			);
			validacao.existeOuErro(
				produto.idUnidade,
				notificacao.unidadeNaoInformada
			);

			const verificarSeExisteEspecie = await app
				.db(tabela.especies)
				.where({ id: produto.idEspecie });
			validacao.existeOuErro(
				verificarSeExisteEspecie,
				notificacao.especieNaoEncontrada
			);

			const verificarSeExisteUnidade = await app
				.db(tabela.unidades)
				.where({ id: produto.idUnidade });
			validacao.existeOuErro(
				verificarSeExisteUnidade,
				notificacao.unidadeNaoEncontrada
			);

			// TENTANDO IMPLEMENTAR UM METODO PARA INSERIR NO BANCO
			// UM ID INEXISTENTE OU INCLUIR UM ID NOVO
			//
			// const obterId = await app
			// 	.db(tabela.produtos)
			// 	.select(coluna.id)
			// 	.where({ id: produto.id })
			// 	.first();
			// // primeiro input
			// if (obterId.id) {
			// 	produto.id = 1;
			// 	// demais input
			// } else {
			// 	console.log(obterId);
			// 	produto.id = obterId++;
			// }

			app.db(tabela.produtos)
				.insert(produto)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obterJoin = (req, res) => {
		app.db(tabela.produtos)
			.select(
				"produtos.id",
				"produtos.nome",
				"especies.nome as nomeEspecie",
				"unidades.nome as nomeUnidade"
			)
			.join(tabela.especies, "produtos.idEspecie", "=", "especies.id")
			.join(tabela.unidades, "produtos.idUnidade", "=", "unidades.id")
			.then((produtos) => res.json(produtos))
			.catch((erro) => res.status(500).send(erro));
	};

	return { incluir, obterJoin };
};
