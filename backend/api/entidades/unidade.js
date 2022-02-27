module.exports = (app) => {
	const limitePorPagina = app.api.relatorios.config.paginacao;
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const unidade = { ...req.body };
			v.existeOuErro(unidade.nome, n.unidadeNaoInformada);

			if (unidade.id === null) delete unidade.id;

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
			.orderBy(coluna.nome)
			.then((unidades) => res.json(unidades))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorPaginacao = async (req, res) => {
		const pagina = req.query.pagina || 1;
		const totalDeUnidadesDoBanco = await app
			.db(tabela.unidades)
			.count(coluna.id)
			.first();
		const totalDeUnidades = parseInt(totalDeUnidadesDoBanco.count);

		app.db(tabela.unidades)
			.select(coluna.id, coluna.nome)
			.whereNull(coluna.removidoEm)
			.orderBy(coluna.nome)
			.limit(limitePorPagina)
			.offset(pagina * limitePorPagina - limitePorPagina)
			.then((unidades) =>
				res.json({
					unidades: unidades,
					totalDeUnidades,
					limitePorPagina,
				})
			)
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			v.numeroOuErro(req.params.id, n.idInvalido);

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

	const obterPorParametro = async (req, res) => {
		try {
			const unidade = { id: req.body.id, nome: req.body.nome };

			// VERIFICA SE INFORMOU ALGO
			if (!unidade.id && !unidade.nome) throw n.digiteAlgo;

			// VERIFICA SE STRING ESTÁ VÁZIA
			if (v.stringVazia(unidade.id)) {
			} else if (!v.éNumero(unidade.id)) {
				// if (!v.éNumero(unidade.id)) {
				v.numeroOuErro(unidade.id, n.idInvalido);
				unidade.id = 0;
			}

			if (v.stringVazia(unidade.nome)) unidade.nome = "";

			// CONSULTA SE INFORMAR ID E NOME
			if (!!unidade.id && !!unidade.nome) {
				await app
					.db(tabela.unidades)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where({ id: unidade.id })
					.where(coluna.nome, "like", unidade.nome)
					.then((unidades) => res.json(unidades))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE INFORMAR APENAS ID
			else if (!!unidade.id && !unidade.nome) {
				await app
					.db(tabela.unidades)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where({ id: unidade.id })
					.then((unidades) => res.json(unidades))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE INFORMAR APENAS NOME
			else if (!unidade.id && !!unidade.nome) {
				await app
					.db(tabela.unidades)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where(coluna.nome, "like", unidade.nome)
					.then((unidades) => res.json(unidades))
					.catch((erro) => res.status(500).send(erro));
			}
		} catch (erro) {
			res.status(400).send(erro);
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
			v.naoExisteOuErro(produto, n.unidadePossuiProduto);

			const removida = await app
				.db(tabela.unidades)
				.update({ removidoEm: new Date() })
				.where({ id: unidade.id });
			v.existeOuErro(removida, n.unidadeNaoEncontrada);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			v.numeroOuErro(req.params.id, n.idInvalido);
			const unidade = { ...req.body };
			unidade.id = req.params.id;
			const verificarSeExisteUnidade = await app
				.db(tabela.unidades)
				.where({ id: unidade.id })
				.whereNull(coluna.removidoEm);
			v.existeOuErro(verificarSeExisteUnidade, n.unidadeNaoEncontrada);

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

	return {
		incluir,
		atualizar,
		remover,
		obter,
		obterPorId,
		obterPorParametro,
		obterPorPaginacao,
	};
};
