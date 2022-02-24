module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const tela = { nome: req.body.nome, idModulo: req.body.idModulo };

			validacao.existeOuErro(tela.nome, notificacao.nomeNaoInformado);
			validacao.existeOuErro(tela.idModulo, "Módulo não informado!");

			const verificarSeExisteModuloNoBanco = await app
				.db(tabela.modulos)
				.where({ id: tela.idModulo });
			validacao.existeOuErro(
				verificarSeExisteModuloNoBanco,
				"Módulo não existe"
			);

			app.db(tabela.telas)
				.insert(tela)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			const tela = { id: req.params.id, nome: req.body.nome };
			validacao.numeroOuErro(tela.id, validacao.idInvalido);

			const verificarNoBanco = await app
				.db(tabela.telas)
				.where({ id: tela.id });
			validacao.existeOuErro(verificarNoBanco, "Tela não encontrado");

			const verificarVinculoComAlgumaTela = await app
				.db(tabela.telas)
				.where({ idtela: tela.id });

			validacao.naoExisteOuErro(
				verificarVinculoComAlgumaTela,
				"Esta tela possui um módulo vinculado!"
			);

			tela.alteradoEm = new Date();
			app.db(tabela.telas)
				.update(tela)
				.where({ id: tela.id })
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.telas)
			.then((telas) => res.json(telas))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterJoin = (req, res) => {
		app.db(tabela.telas)
			.select(
				"telas.id",
				"telas.nome",
				"modulos.id as moduloId",
				"modulos.nome as moduloNome"
			)
			.whereNull("telas.removidoEm")
			.orderBy(coluna.nome)
			.join(tabela.modulos, "telas.idModulo", "=", "modulos.id")
			.then((telas) => res.json(telas))
			.catch((erro) => res.status(500).send(erro));
	};

	return { incluir, atualizar, obter, obterJoin };
};
