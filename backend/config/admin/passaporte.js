const { authSecret } = require("../../.env");
const passaporte = require("passport");
const passaporteJwt = require("passport-jwt");
const { Strategy, ExtractJwt } = passaporteJwt;

module.exports = (app) => {
	const parametros = {
		secretOrKey: authSecret,
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
	};

	const estrategia = new Strategy(parametros, (req, res) => {
		app.db("usuarios")
			.where({ id: req.id })
			.first()
			.then((usuario) => res(null, usuario ? { ...req } : false))
			.catch((erro) => res(erro, false));
	});

	passaporte.use(estrategia);

	return {
		autenticar: () => passaporte.authenticate("jwt", { session: false }),
	};
};
