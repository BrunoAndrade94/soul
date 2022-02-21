module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const unidade = { ...req.body };
			validacao.existeOuErro(
				unidade.nome,
				notificacao.unidadeNaoEncontrada
			);

			app.db(tabela.unidades)
				.insert(unidade)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.unidades)
			.select(coluna.id, coluna.nome)
			.whereNull(coluna.removidoEm)
			.then((unidades) => res.json(unidades))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);

			app.db(tabela.unidades)
				.select(coluna.id, coluna.nome)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.then((unidade) => res.json(unidade))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.stauts(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			const unidade = { ...req.body };
			unidade.id = req.params.id;

			const produto = await app
				.db(tabela.produtos)
				.where({ idUnidade: unidade.id })
				.whereNull(coluna.removidoEm);
			validacao.naoExisteOuErro(
				produto,
				notificacao.unidadePossuiProduto
			);

			const apagados = await app
				.db(tabela.unidades)
				.update({ removidoEm: new Date() })
				.where({ id: unidade.id });
			validacao.existeOuErro(apagados, notificacao.unidadeNaoEncontrada);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			const unidade = { ...req.body };
			unidade.id = req.params.id;

			const verificarSeExisteUnidade = await app
				.db(tabela.unidades)
				.where({ id: unidade.id })
				.whereNull(coluna.removidoEm);
			validacao.existeOuErro(
				verificarSeExisteUnidade,
				notificacao.unidadeNaoEncontrada
			);

			const verificarSeExisteProduto = await app
				.db(tabela.produtos)
				.where({ idUnidade: unidade.id });
			validacao.naoExisteOuErro(
				verificarSeExisteProduto,
				notificacao.unidadePossuiProduto
			);

			unidade.alteradoEm = new Date();
			app.db(tabela.unidades)
				.update(unidade)
				.where({ id: unidade.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, remover, obter, obterPorId };
};
