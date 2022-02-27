module.exports = (app) => {
	const limitePorPagina = app.api.relatorios.config.paginacao;
	const n = app.api.config.notificacoes;
	const v = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	//============================================
	// PARA CONSULTAS NO BANCO USANDO JOIN =======
	//============================================
	// QUERY
	const igual = "=";
	const like = "like";

	// LINHAS DO SELECT
	const produtosId = "produtos.id";
	const produtosNome = "produtos.nome";
	const especiesIdAs = "especies.id as idEspecie";
	const especiesNomeAs = "especies.nome as nomeEspecie";
	const unidadesIdAs = "unidades.id as idUnidade";
	const unidadesNomeAs = "unidades.nome as nomeUnidade";

	// COLUNA NULO
	const produtosNull = "produtos.removidoEm";

	// PARA FAZER JOIN
	const produtosIdEspecie = "produtos.idEspecie";
	const produtosIdUnidade = "produtos.idUnidade";
	const especiesId = "especies.id";
	const unidadesId = "unidades.id";

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

	const obterJoin = async (req, res) => {
		try {
			const pagina = req.query.pagina || 1;
			const totalDeProdutosDoBanco = await app
				.db(tabela.produtos)
				.count(coluna.id)
				.first();
			const totalDeProdutos = parseInt(totalDeProdutosDoBanco.count);

			app.db(tabela.produtos)
				.select(
					produtosId,
					produtosNome,
					especiesIdAs,
					especiesNomeAs,
					unidadesIdAs,
					unidadesNomeAs
				)
				.whereNull(produtosNull)
				.orderBy(coluna.nome)
				.join(tabela.especies, produtosIdEspecie, igual, especiesId)
				.join(tabela.unidades, produtosIdUnidade, igual, unidadesId)
				.limit(limitePorPagina)
				.offset(pagina * limitePorPagina - limitePorPagina)
				.then((produtos) =>
					res.json({
						produtos: produtos,
						totalDeProdutos,
						limitePorPagina,
					})
				)
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obterPorParametro = async (req, res) => {
		try {
			const produto = {
				id: req.body.id,
				nome: req.body.nome,
				idEspecie: req.body.idEspecie,
				idUnidade: req.body.idUnidade,
			};

			if (
				!produto.id &&
				!produto.nome &&
				!produto.idEspecie &&
				!produto.idUnidade
			)
				throw n.digiteAlgo;

			// VERIFICA SE NÃO TEM CONTEÚDO E SE NÃO É UM NÚMERO
			if (!!produto.id && !v.éNumero(produto.id)) {
				v.numeroOuErro(produto.id, n.idInvalido);
				produto.id = 0;
			}
			if (!!produto.idEspecie && !v.éNumero(produto.idEspecie)) {
				v.numeroOuErro(produto.idEspecie, n.idInvalido);
				produto.idEspecie = 0;
			}
			if (!!produto.idUnidade && !v.éNumero(produto.idUnidade)) {
				v.numeroOuErro(produto.idUnidade, n.idInvalido);
				produto.idUnidade = 0;
			}

			if (v.stringVazia(produto.nome)) produto.nome = "";

			// CONSULTA SE TIVER ID, NOME, IDESPECIE, IDUNIDADE
			if (
				!!produto.id &&
				!!produto.nome &&
				!!produto.idEspecie &&
				!!produto.idUnidade
			) {
				await app
					.db(tabela.produtos)
					.select(
						produtosId,
						produtosNome,
						especiesIdAs,
						especiesNomeAs,
						unidadesIdAs,
						unidadesNomeAs
					)
					.whereNull(produtosNull)
					.orderBy(coluna.nome)
					.join(tabela.especies, produtosIdEspecie, igual, especiesId)
					.join(tabela.unidades, produtosIdUnidade, igual, unidadesId)
					.where(produtosId, igual, produto.id)
					.where(produtosNome, igual, produto.nome)
					.where(especiesId, igual, produto.idEspecie)
					.where(unidadesId, igual, produto.idUnidade)
					.then((produtos) => res.json(produtos))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE TIVER ID, IDESPECIE, IDUNIDADE
			else if (
				!!produto.id &&
				!!produto.idEspecie &&
				!!produto.idUnidade
			) {
				await app
					.db(tabela.produtos)
					.select(
						produtosId,
						produtosNome,
						especiesIdAs,
						especiesNomeAs,
						unidadesIdAs,
						unidadesNomeAs
					)
					.whereNull(produtosNull)
					.orderBy(coluna.nome)
					.join(tabela.especies, produtosIdEspecie, igual, especiesId)
					.join(tabela.unidades, produtosIdUnidade, igual, unidadesId)
					.where(produtosId, igual, produto.id)
					.where(especiesId, igual, produto.idEspecie)
					.where(unidadesId, igual, produto.idUnidade)
					.then((produtos) => res.json(produtos))
					.catch((erro) => res.status(500).send(erro));
			}
			// CONSULTA SE TIVER IDESPECIE E IDUNIDADE
			else if (!!produto.idEspecie && !!produto.idUnidade) {
				await app
					.db(tabela.produtos)
					.select(
						produtosId,
						produtosNome,
						especiesIdAs,
						especiesNomeAs,
						unidadesIdAs,
						unidadesNomeAs
					)
					.whereNull(produtosNull)
					.orderBy(coluna.nome)
					.join(tabela.especies, produtosIdEspecie, igual, especiesId)
					.join(tabela.unidades, produtosIdUnidade, igual, unidadesId)
					.where(especiesId, igual, produto.idEspecie)
					.where(unidadesId, igual, produto.idUnidade)
					.then((produtos) => res.json(produtos))
					.catch((erro) => res.status(500).send(erro));
			}
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
