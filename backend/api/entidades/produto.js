module.exports = (app) => {
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const incluir = async (req, res) => {
		try {
			const produto = {
				nome: req.body.nome,
				idEspecie: req.body.idEspecie,
				idUnidade: req.body.idUnidade,
			};

			v.existeOuErro(produto.nome, n.nomeNaoInformado);
			v.existeOuErro(produto.idEspecie, n.especieNaoInformada);
			v.existeOuErro(produto.idUnidade, n.unidadeNaoInformada);

			const verificarSeExisteEspecie = await app
				.db(tabela.especies)
				.where({ id: produto.idEspecie });
			v.existeOuErro(verificarSeExisteEspecie, n.especieNaoEncontrada);

			const verificarSeExisteUnidade = await app
				.db(tabela.unidades)
				.where({ id: produto.idUnidade });
			v.existeOuErro(verificarSeExisteUnidade, n.unidadeNaoEncontrada);

			if (produto.id === null) delete produto.id;

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

	const atualizar = (req, res) => {
		try {
			const produto = {
				id: req.body.id,
				nome: req.body.nome,
				idEspecie: req.body.idEspecie,
				idUnidade: req.body.idUnidade,
			};
			if (!produto.id) produto.id = req.params.id;

			produto.alteradoEm = new Date();
			app.db(tabela.produtos)
				.update(produto)
				.where({ id: produto.id })
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
				"especies.id as idEspecie",
				"especies.nome as nomeEspecie",
				"unidades.id as idUnidade",
				"unidades.nome as nomeUnidade"
			)
			.whereNull("produtos.removidoEm")
			.orderBy(coluna.nome)
			.join(tabela.especies, "produtos.idEspecie", "=", "especies.id")
			.join(tabela.unidades, "produtos.idUnidade", "=", "unidades.id")
			.then((produtos) => res.json(produtos))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorParametro = async (req, res) => {
		try {
			// const produto = { nome: req.body.nome };
			const produto = {
				id: req.body.id,
				nome: req.body.nome,
				idEspecie: req.body.idEspecie,
				idUnidade: req.body.idUnidade,
			};
			console.log(produto);
			if (!!req.body.id) {
				if (req.body.id !== undefined) {
					v.numeroOuErro(req.body.id, n.idInvalido);
				}
			} else if (!v.éNumero(req.body.id)) {
				produto.id = 0;
			}

			if (!!req.body.idEspecie) {
				if (req.body.idEspecie !== undefined) {
					v.numeroOuErro(req.body.idEspecie, n.idInvalido);
				}
			} else if (!v.éNumero(req.body.idEspecie)) {
				produto.idEspecie = 0;
			}

			if (!!req.body.idUnidade) {
				if (req.body.idUnidade !== undefined) {
					v.numeroOuErro(req.body.idUnidade, n.idInvalido);
				}
			} else if (!v.éNumero(req.body.idUnidade)) {
				produto.idUnidade = 0;
			}

			if (produto.nome === undefined) produto.nome = "";

			console.log(produto);

			const achados = await app
				.db(tabela.produtos)
				// .select(
				// 	"produtos.id",
				// 	"produtos.nome",
				// 	"especies.id as idEspecie",
				// 	"especies.nome as nomeEspecie"
				// 	// "unidades.id as idUnidade",
				// 	// "unidades.nome as nomeUnidade"
				// )
				// .join(tabela.especies, "produtos.idEspecie", "=", "especies.id")
				// .join(tabela.unidades, "produto.idUnidade", "=", "unidades.id")
				// .whereNull("produtos.removidoEm")
				.where({ id: produto.id })
				.whereNull(coluna.removidoEm)
				// .whereNull("especies.removidoEm")
				// .whereNull(coluna.removidoEm)
				.whereNull(coluna.removidoEm)
				.orWhere({ idEspecie: produto.idEspecie })
				// .whereNull("unidades.removidoEm")
				.whereNull(coluna.removidoEm)
				.orWhere({ idUnidade: produto.idUnidade })
				//
				.whereNull(coluna.removidoEm)
				.orWhere(coluna.nome, "like", produto.nome);

			// const achados = await app
			// 	.db(tabela.produtos)
			// 	.select(coluna.id, coluna.nome)
			// 	.whereNull(coluna.removidoEm)
			// 	.where({ id: produto.id })
			// 	.whereNull(coluna.removidoEm)
			// 	.orWhere({ idEspecie: produto.idEspecie })
			// 	.whereNull(coluna.removidoEm)
			// 	.orWhere({ idUnidade: produto.idUnidade })
			// 	.whereNull(coluna.removidoEm)
			// 	.orWhere(coluna.nome, "like", produto.nome);

			v.existeOuErro(achados, n.naoEncontreiNada);

			res.json(achados);
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			const produto = {
				id: req.body.id,
				nome: req.body.nome,
				idEspecie: req.body.idEspecie,
				idUnidade: req.body.idUnidade,
			};
			if (!produto.id) produto.id = req.params.id;
			console.log(produto);
			const removido = await app
				.db(tabela.produtos)
				.update({ removidoEm: new Date() })
				.where({ id: produto.id });

			v.existeOuErro(removido, n.produtoNaoEncontrado);
			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, obterJoin, remover, obterPorParametro };
};
