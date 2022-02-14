const { authSecret } = require("../../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
	const login = async (req, res) => {
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
			.first();

		const deuCerto = bcrypt.compareSync(req.body.senha, usuario.senha);
		if (!deuCerto) {
			return res.status(401).send("Usuário ou Senha inválidos!");
		}

		const agora = Math.floor(Date.now() / 1000);

		const cargaUtil = {
			id: usuario.id,
			usuario: usuario.usuario,
			nome: usuario.nome,
			email: usuario.email,
			admin: usuario.admin,
			iat: agora,
			exp: agora + 60 * 60 * 42 * 3,
		};

		res.json({ ...cargaUtil, token: jwt.encode(cargaUtil, authSecret) });
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

	return { login, validarToken };
};
