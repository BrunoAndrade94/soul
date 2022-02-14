// criptografar senha
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	const criptografarSenha = (senha) => {
		const tempero = bcrypt.genSaltSync(10);
		return bcrypt.hashSync(senha, tempero);
	};

	const incluir = async (req, res) => {
		try {
			// obtem usuario do corpo da requisição
			const usuario = { ...req.body };

			// validações para persistencia dos dados
			validacao.existeOuErro(
				[usuario.nome, notificacao.nomeNaoInformado],
				[usuario.email, notificacao.emailNaoInformado],
				[usuario.usuario, notificacao.usuarioNaoInformado],
				[usuario.senha, notificacao.senhaNaoInformada],
				[usuario.confirmacaoSenha, notificacao.confirmacaoInvalida]
			);
			validacao.igualOuErro(
				usuario.senha,
				usuario.confirmacaoSenha,
				notificacao.senhasNaoConferem
			);

			// consultar se existe cadastro de usuário ou email
			const verificarNomeDeUsuario = await app
				.db(tabela.usuarios)
				.where({ usuario: usuario.usuario })
				.whereNull(coluna.removidoEm)
				.first();
			const verificarEmailDeUsuario = await app
				.db(tabela.usuarios)
				.where({ email: usuario.email })
				.whereNull(coluna.removidoEm)
				.first();

			validacao.naoExisteOuErro(
				verificarNomeDeUsuario,
				notificacao.usuarioJaCadastrado
			);
			validacao.naoExisteOuErro(
				verificarEmailDeUsuario,
				notificacao.emailJaCadastrado
			);

			// criptografar a senha antes de persistir
			usuario.senha = criptografarSenha(usuario.senha);
			delete usuario.confirmacaoSenha;

			// persistir usuario no banco
			app.db(tabela.usuarios)
				.insert(usuario)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const atualizar = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			const usuario = { ...req.body };
			usuario.id = req.params.id;

			const verificarIdDoUsuario = await app
				.db(tabela.usuarios)
				.where({ id: usuario.id })
				.whereNull(coluna.removidoEm)
				.first();
			validacao.existeOuErro(
				verificarIdDoUsuario,
				notificacao.usuarioNaoEncontrado
			);

			usuario.alteradoEm = new Date();
			app.db(tabela.usuarios)
				.update(usuario)
				.where({ id: usuario.id })
				.whereNull(coluna.removidoEm)
				.then((_) => res.status(204).send())
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const remover = async (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);
			const deletadas = await app
				.db(tabela.usuarios)
				.update({ removidoEm: new Date() })
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm);

			validacao.existeOuErro(deletadas, notificacao.usuarioNaoEncontrado);
			res.status(204).send();
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const obter = (req, res) => {
		app.db(tabela.usuarios)
			.select(
				coluna.id,
				coluna.nome,
				coluna.email,
				coluna.usuario,
				coluna.admin
			)
			.whereNull(coluna.removidoEm)
			.then((usuarios) => res.json(usuarios))
			.catch((erro) => res.status(500).send(erro));
	};

	const obterPorId = (req, res) => {
		try {
			validacao.numeroOuErro(req.params.id, notificacao.idInvalido);

			app.db(tabela.usuarios)
				.select(
					coluna.id,
					coluna.nome,
					coluna.email,
					coluna.usuario,
					coluna.admin
				)
				.where({ id: req.params.id })
				.whereNull(coluna.removidoEm)
				.first()
				.then((usuario) => res.json(usuario))
				.catch((erro) => res.status(500).send(erro));
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	return { incluir, atualizar, remover, obter, obterPorId };
};