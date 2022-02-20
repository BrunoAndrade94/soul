const { authSecret } = require("../../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
	const notificacao = app.api.config.notificacoes;
	const validacao = app.api.config.validacoes;
	const coluna = app.api.entidades.db.colunas;

	const logar = async (req, res) => {
		try {
			// verificando se foi fornecido usuário e senha
			if (!req.body.usuario) {
				return res.status(400).send("Informe o Usuário!");
			}
			if (!req.body.senha) {
				return res.status(400).send("Informe a Senha!");
			}

			// obtendo o usuário do banco de dados
			const usuario = await app
				.db("usuarios")
				.where({ usuario: req.body.usuario })
				.whereNull(coluna.removidoEm)
				.first();
			validacao.existeOuErro(usuario, notificacao.usuarioNaoEncontrado);

			const deuCerto = bcrypt.compareSync(req.body.senha, usuario.senha);
			if (!deuCerto) {
				return res.status(400).send("Usuário ou Senha inválidos!");
			}

			const agora = Math.floor(Date.now() / 1000);

			const cargaUtil = {
				id: usuario.id,
				usuario: usuario.usuario,
				nome: usuario.nome,
				email: usuario.email,
				admin: usuario.admin,
				iat: agora,
				//exp: agora + 10,
				exp: agora + 60 * 60 * 42 * 3,
			};

			res.json({
				...cargaUtil,
				token: jwt.encode(cargaUtil, authSecret),
			});
		} catch (erro) {
			res.status(400).send(erro);
		}
	};

	const validarToken = async (req, res) => {
		const dadosUsuario = req.body || null;
		try {
			if (dadosUsuario) {
				const token = jwt.decode(dadosUsuario.token, authSecret);
				if (new Date(token.exp * 1000) > new Date()) {
					return res.send(true);
				}
			}
		} catch (erro) {
			res.status(400).send(erro);
		}
		return res.send(false);
	};
	return { logar, validarToken };
};
