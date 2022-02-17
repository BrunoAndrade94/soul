module.exports = (app) => {
	app.post("/login", app.config.admin.autenticar.login);
	app.post("/cadastro", app.api.entidades.usuario.incluir);
	app.post("/validarToken", app.config.admin.autenticar.validarToken);

	// ROTAS DE USUARIOS
	app.route("/usuarios")
		.post(app.api.entidades.usuario.incluir)
		.get(app.api.entidades.usuario.obter);

	app.route("/usuarios/:id")
		.get(app.api.entidades.usuario.obterPorId)
		.delete(app.api.entidades.usuario.remover)
		.put(app.api.entidades.usuario.atualizar);

	// ROTAS DE CLASSES
	app.route("/classes")
		.post(app.api.entidades.classe.incluir)
		.get(app.api.entidades.classe.obter);

	app.route("/classes/:id")
		.get(app.api.entidades.classe.obterPorId)
		.delete(app.api.entidades.classe.remover)
		.put(app.api.entidades.classe.atualizar);

	// ROTAS UNIDADES
	app.route("/unidades")
		.post(app.api.entidades.unidade.incluir)
		.get(app.api.entidades.unidade.obter);

	app.route("/unidades/:id")
		.put(app.api.entidades.unidade.atualizar)
		.get(app.api.entidades.unidade.obterPorId)
		.delete(app.api.entidades.unidade.remover);

	// ROTAS MÓDULOS
	app.route("/modulos")
		.post(app.api.entidades.telas.modulo.incluir)
		.get(app.api.entidades.telas.modulo.obter);

	app.route("/modulos/arvore").get(
		app.api.entidades.telas.modulo.obterArvore
	);

	app.route("/recuperarModulos/id").post(
		app.api.entidades.telas.modulo.recuperarRemovido
	);

	app.route("/modulos/:id")
		.get(app.api.entidades.telas.modulo.obterPorId)
		.delete(app.api.entidades.telas.modulo.remover)
		.put(app.api.entidades.telas.modulo.atualizar);

	// ROTAS TELAS
	app.route("/telas")
		.post(app.api.entidades.telas.tela.incluir)
		.get(app.api.entidades.telas.tela.obter);

	app.route("/telas/:id").put(app.api.entidades.telas.tela.atualizar);
};
