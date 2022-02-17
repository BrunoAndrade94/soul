module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const modulo = { nome: req.body.nome, idTela: req.body.idTela };
			validacao.existeOuErro(modulo.nome, notificacao.nomeNaoInformado);

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
			const modulo = {
				id: req.params.id,
				nome: req.body.nome,
				idTela: req.body.idTela,
			};
			validacao.numeroOuErro(modulo.id, validacao.idInvalido);

			const verificarNoBanco = await app
				.db(tabela.modulos)
				.where({ id: modulo.id });
			validacao.existeOuErro(
				verificarNoBanco,
				notificacao.moduloNaoEncontrado
			);

			// SEM USO
			// const verificarVinculoComAlgumaTela = await app
			// 	.db(tabela.telas)
			// 	.where({ idModulo: modulo.id });

			// validacao.existeOuErro(
			// 	verificarVinculoComAlgumaTela,
			// 	'Este módulo possui uma tela vinculada!'
			// );

			modulo.alteradoEm = new Date();
			app.db(tabela.modulos)
				.update(modulo)
				.where({ id: modulo.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.modulos)
			.whereNull(coluna.removidoEm)
			.then((modulos) => res.json(comCaminho(modulos)))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			app.db(tabela.modulos)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.then((modulo) => res.json(comCaminho(modulo)))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const comCaminho = (modulos) => {
		const obterTela = (modulos, idTela) => {
			const tela = modulos.filter((tela) => tela.id === idTela);
			return tela.length ? tela[0] : null;
		};

		const modulosComCaminho = modulos.map((modulo) => {
			let caminho = modulo.nome;
			let tela = obterTela(modulos, modulo.idTela);

			while (tela) {
				caminho = `${tela.nome} >> ${caminho}`;
				tela = obterTela(modulos, tela.idTela);
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
			const modulo = { ...req.params };
			validacao.numeroOuErro(modulo.id, notificacao.idInvalido);

			const verificarSeExisteModulo = await app
				.db(tabela.modulos)
				.where({ id: modulo.id })
				.first();

			validacao.existeOuErro(
				verificarSeExisteModulo,
				notificacao.moduloNaoEncontrado
			);

			const verificarTelaVinculada = await app
				.db(tabela.telas)
				.where({ idModulo: modulo.id });

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
		if (!arvore) arvore = modulos.filter((modulo) => !modulo.idTela);
		arvore = arvore.map((tela) => {
			const seForFilhe = (nó) => nó.idTela == tela.id;
			tela.children = paraArvore(modulos, modulos.filter(seForFilhe));
			return tela;
		});
		return arvore;
	};

	const obterArvore = (req, res) => {
		app.db(tabela.modulos)
			.then((modulos) => modulos.json(modulos))
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
