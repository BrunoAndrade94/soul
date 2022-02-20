module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const especie = { ...req.body };
			validacao.existeOuErro(especie.nome, notificacao.nomeNaoInformado);

			app.db(tabela.especies)
				.insert(especie)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			const especie = { ...req.body };
			especie.id = req.params.id;

			const verificarSeExisteEspecie = await app
				.db(tabela.especies)
				.where({ id: especie.id })
				.whereNull(coluna.removidoEm);
			validacao.existeOuErro(
				verificarSeExisteEspecie,
				notificacao.especieNaoEncontrada
			);

			const verificarSeExisteProduto = await app
				.db(tabela.produtos)
				.where({ idEspecie: especie.id ? especie.id : 0 });
			validacao.naoExisteOuErro(
				verificarSeExisteProduto,
				notificacao.especiePossuiProduto
			);

			especie.alteradoEm = new Date();
			app.db(tabela.especies)
				.update(especie)
				.where({ id: especie.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.especies)
			.select(coluna.id, coluna.nome)
			.whereNull(coluna.removidoEm)
			.then((especies) => res.json(especies))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorParametro = (req, res) => {
		try {
			const especie = { ...req.body };
			if (req.params.id) {
				validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
				especie.id = req.params.id;
			}

			validacao.existeOuErro(especie.nome, validacao.nomeNaoInformado);

			app.db(tabela.especies)
				.select(coluna.id, coluna.nome)
				.where(coluna.nome, "like", especie.nome ? especie.nome : null)
				.orWhere({ id: especie.id ? especie.id : 0 })
				.then((especies) => res.json(especies).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, obter, obterPorParametro };
};
