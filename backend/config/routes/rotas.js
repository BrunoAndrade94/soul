const admin = require("../admin/adm");

module.exports = (app) => {
	app.post("/logar", app.config.admin.autenticar.logar);
	app.post("/cadastro", app.api.entidades.usuario.incluir);
	app.post("/validarToken", app.config.admin.autenticar.validarToken);

	// app.route("/estatisticas")
	// 	.all(app.config.admin.passaporte.autenticar())
	// 	.get(app.api.relatorios.proprios.estatisticas.obter);

	// ROTAS DE USUARIOS
	app.route("/usuarios")
		.all(app.config.admin.passaporte.autenticar())
		.post(admin(app.api.entidades.usuario.incluir))
		.get(app.api.entidades.usuario.obter);

	app.route("/usuarios/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.usuario.obterPorId)
		.delete(admin(app.api.entidades.usuario.remover))
		.put(admin(app.api.entidades.usuario.atualizar));

	// ROTAS DE CLASSES
	app.route("/classes")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.classe.incluir)
		.get(app.api.entidades.classe.obter);

	app.route("/classes/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.classe.obterPorId)
		.delete(app.api.entidades.classe.remover)
		.put(app.api.entidades.classe.atualizar);

	// ROTAS UNIDADES
	app.route("/unidades")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.unidade.incluir)
		.get(app.api.entidades.unidade.obter);

	app.route("/unidades/:id")
		.all(app.config.admin.passaporte.autenticar())
		.put(app.api.entidades.unidade.atualizar)
		.get(app.api.entidades.unidade.obterPorId)
		.delete(app.api.entidades.unidade.remover);

	// ROTAS MÓDULOS
	app.route("/modulos")
		.post(app.api.entidades.telas.modulo.incluir)
		.get(app.api.entidades.telas.modulo.obter);

	app.route("/arvore/modulos")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.telas.modulo.obterArvore);

	app.route("/recuperarModulos/id")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.telas.modulo.recuperarRemovido);

	app.route("/modulos/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.telas.modulo.obterPorId)
		.delete(app.api.entidades.telas.modulo.remover)
		.put(app.api.entidades.telas.modulo.atualizar);

	// ROTAS TELAS
	app.route("/telas")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.telas.tela.incluir)
		.get(app.api.entidades.telas.tela.obter);

	app.route("/telas/:id")
		.all(app.config.admin.passaporte.autenticar())
		.put(app.api.entidades.telas.tela.atualizar);
};
