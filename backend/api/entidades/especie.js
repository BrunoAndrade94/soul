module.exports = (app) => {
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const especie = { ...req.body };
			v.existeOuErro(especie.nome, n.nomeNaoInformado);

			if (especie.id === null) delete especie.id;

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
			v.numeroOuErro(req.params.id, n.idInvalido);
			const especie = { ...req.body };
			especie.id = req.params.id;

			const verificarSeExisteEspecie = await app
				.db(tabela.especies)
				.where({ id: especie.id })
				.whereNull(coluna.removidoEm);
			v.existeOuErro(verificarSeExisteEspecie, n.especieNaoEncontrada);

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
			.orderBy(coluna.nome)
			.then((especies) => res.json(especies))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorParametro = (req, res) => {
		try {
			const especie = { ...req.body };
			if (req.params.id) {
				v.numeroOuErro(req.params.id, n.idInvalido);
				especie.id = req.params.id;
			}

			v.existeOuErro(especie.nome, n.nomeNaoInformado);

			app.db(tabela.especies)
				.select(coluna.id, coluna.nome)
				.where(coluna.nome, "like", especie.nome ? especie.nome : null)
				.orWhere({ id: especie.id })
				.then((especies) => res.json(especies).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			const especie = { ...req.body };
			if (!especie.id) especie.id = req.params.id;

			const verificarSeExisteProduto = await app
				.db(tabela.produtos)
				.where({ idEspecie: especie.id })
				.whereNull(coluna.removidoEm);
			v.naoExisteOuErro(verificarSeExisteProduto, n.especiePossuiProduto);

			const removida = await app
				.db(tabela.especies)
				.update({ removidoEm: new Date() })
				.where({ id: especie.id });
			v.existeOuErro(removida, n.especieNaoEncontrada);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, obter, obterPorParametro, remover };
};
