module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const modulo = { nome: req.body.nome, maeId: req.body.maeId };
			validacao.existeOuErro(modulo.nome, notificacao.nomeNaoInformado);

			if (modulo.maeId !== undefined) {
				const verificarModuloExiste = await app
					.db(tabela.modulos)
					.where({ id: modulo.maeId })
					.whereNull(coluna.removidoEm);
				validacao.existeOuErro(
					verificarModuloExiste,
					notificacao.moduloNaoEncontrado
				);
			}

			app.db(tabela.modulos)
				.insert(modulo)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			const modulo = { ...req.body };
			modulo.id = req.params.id;
			validacao.numeroOuErro(modulo.id, notificacao.idInvalido);

			const verificarNoBanco = await app
				.db(tabela.modulos)
				.where({ id: modulo.id });
			validacao.existeOuErro(verificarNoBanco, "erro");

			// SEM USO
			const verificarVinculoComTelas = await app
				.db(tabela.modulos)
				.where({ maeId: modulo.id });

			validacao.naoExisteOuErro(
				verificarVinculoComTelas,
				notificacao.moduloPossuiSubModulos
			);

			modulo.alteradoEm = new Date();
			const alterado = await app
				.db(tabela.modulos)
				.update(modulo)
				.where({ id: modulo.id });
			validacao.existeOuErro(alterado, notificacao.moduloAlterado);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.modulos)
			.select(coluna.id, coluna.nome, coluna.maeId)
			.whereNull(coluna.removidoEm)
			.then((modulos) => res.json(comCaminho(modulos)))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			app.db(tabela.modulos)
				.select(coluna.id, coluna.nome, coluna.maeId)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.then((modulo) => res.json(comCaminho(modulo)))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const comCaminho = (modulos) => {
		const obterMae = (modulos, maeId) => {
			const mae = modulos.filter((mae) => mae.id === maeId);
			return mae.length ? mae[0] : null;
		};

		const modulosComCaminho = modulos.map((modulo) => {
			let caminho = modulo.nome;
			let mae = obterMae(modulos, modulo.maeId);

			while (mae) {
				caminho = `${mae.nome} >> ${caminho}`;
				mae = obterMae(modulos, mae.maeId);
			}
			return { ...modulo, caminho };
		});

		modulosComCaminho.sort((a, b) => {
			if (a.caminho < b.caminho) return -1;
			if (a.caminho > b.caminho) return 1;
			return 0;
		});

		return modulosComCaminho;
	};

	const remover = async (req, res) => {
		try {
			const modulo = {
				id: req.params.id,
			};
			validacao.numeroOuErro(modulo.id, notificacao.idInvalido);

			const verificarSeExisteModulo = await app
				.db(tabela.modulos)
				.where({ id: modulo.id })
				.whereNull(coluna.removidoEm);

			validacao.existeOuErro(
				verificarSeExisteModulo,
				notificacao.moduloNaoEncontrado
			);

			const verificarSubModulos = await app
				.db(tabela.modulos)
				.where({ maeId: modulo.id })
				.whereNull(coluna.removidoEm);

			validacao.naoExisteOuErro(
				verificarSubModulos,
				notificacao.moduloPossuiSubModulos
			);

			const verificarTelaVinculada = await app
				.db(tabela.telas)
				.where({ idModulo: modulo.id })
				.whereNull(coluna.removidoEm);

			validacao.naoExisteOuErro(
				verificarTelaVinculada,
				notificacao.moduloPossuiTelas
			);

			const deletada = await app
				.db(tabela.modulos)
				.update({ removidoEm: new Date() })
				.where({ id: modulo.id });

			validacao.existeOuErro(deletada, notificacao.moduloNaoEncontrado);
			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	// NÃO ESTÁ FUNCIONANDO
	const recuperarRemovido = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);

			const verificarSeExisteModulo = await app
				.db(tabela.modulos)
				.where({ id: req.params.id })
				.first();

			validacao.existeOuErro(
				verificarSeExisteModulo,
				notificacao.moduloNaoEncontrado
			);

			const recuperada = await app
				.db(tabela.modulos)
				.update({ removidoEm: null })
				.where({ id: req.params.id });

			validacao.existeOuErro(recuperada, notificacao.moduloNaoEncontrado);
			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const paraArvore = (modulos, arvore) => {
		if (!arvore) arvore = modulos.filter((modulo) => !modulo.maeId);
		arvore = arvore.map((mae) => {
			const seForFilhe = (no) => no.maeId == mae.id;
			mae.children = paraArvore(modulos, modulos.filter(seForFilhe));
			return mae;
		});
		return arvore;
	};

	const obterArvore = (req, res) => {
		app.db(tabela.modulos)
			.select(coluna.id, coluna.nome, coluna.maeId)
			.whereNull(coluna.removidoEm)
			.then((modulos) => res.json(paraArvore(modulos)))
			.catch((erro) => res.status(500).send(erro));
	};

	return {
		incluir,
		atualizar,
		remover,
		recuperarRemovido,
		obter,
		obterPorId,
		obterArvore,
	};
};
