module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = (req, res) => {
		try {
			const classe = { ...req.body };

			validacao.existeOuErro(classe.nome, notificacao.classeNaoInformada);

			app.db(tabela.classes)
				.insert(classe)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			const classe = { ...req.body };
			classe.id = req.params.id;

			const verificarSeExisteClasse = await app
				.db(tabela.classes)
				.where({ id: classe.id })
				.whereNull(coluna.removidoEm);
			validacao.existeOuErro(
				verificarSeExisteClasse,
				notificacao.classeNaoEncontrada
			);

			const verificarSeExisteProduto = await app
				.db(tabela.produtos)
				.where({ idClasse: classe.id });
			validacao.naoExisteOuErro(
				verificarSeExisteProduto,
				notificacao.classePossuiProduto
			);

			classe.alteradoEm = new Date();
			app.db(tabela.classes)
				.update(classe)
				.where({ id: classe.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.classes)
			.whereNull(coluna.removidoEm)
			.then((classes) => res.json(classes))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);

			app.db(tabela.classes)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.then((classe) => res.json(classe))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.stauts(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);

			const verificarProduto = await app
				.db(tabela.produtos)
				.where({ idClasse: req.params.id });
			validacao.naoExisteOuErro(
				verificarProduto,
				notificacao.classePossuiProduto
			);

			const deletadas = await app
				.db(tabela.classes)
				.update({ removidoEm: new Date() })
				.where({ id: req.params.id });
			validacao.existeOuErro(deletadas, notificacao.classeNaoEncontrada);

			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, remover, obter, obterPorId };
};
