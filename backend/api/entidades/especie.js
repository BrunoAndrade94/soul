module.exports = (app) => {
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const especie = { ...req.body };
			v.existeOuErro(especie.nome, n.nomeNaoInformado);
			if (!especie.id) delete especie.id;

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

	const obterPorParametro = async (req, res) => {
		try {
			const especie = { id: req.body.id, nome: req.body.nome };

			// VERIFICA SE INFORMOU ALGO
			if (!especie.id && !especie.nome) throw n.digiteAlgo;

			// VERIFICA SE STRING ESTÁ VÁZIA
			if (v.stringVazia(especie.id)) {
			} else if (!v.éNumero(especie.id)) {
				v.numeroOuErro(especie.id, n.idInvalido);
				especie.id = 0;
			}

			if (v.stringVazia(especie.nome)) especie.nome = "";

			// CONSULTA SE INFORMAR ID E NOME
			if (!!especie.id && !!especie.nome) {
				await app
					.db(tabela.especies)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where({ id: especie.id })
					.where(coluna.nome, "like", especie.nome)
					.then((especies) => res.json(especies))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE INFORMAR APENAS ID
			else if (!!especie.id && !especie.nome) {
				await app
					.db(tabela.especies)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where({ id: especie.id })
					.then((especies) => res.json(especies))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE INFORMAR APENAS NOME
			else if (!especie.id && !!especie.nome) {
				await app
					.db(tabela.especies)
					.select(coluna.id, coluna.nome)
					.whereNull(coluna.removidoEm)
					.where(coluna.nome, "like", especie.nome)
					.then((especies) => res.json(especies))
					.catch((erro) => res.status(500).send(erro));
			}
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
