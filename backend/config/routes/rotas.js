const admin = require("../admin/adm");

module.exports = (app) => {
	//========================
	// ROTAS LIBERADAS =======
	//========================
	app.post("/logar", app.config.admin.autenticar.logar);
	app.post("/cadastro", app.api.entidades.usuario.incluir);
	app.post("/validarToken", app.config.admin.autenticar.validarToken);

	//========================
	// ROTAS RELATÓRIOS ======
	//========================
	app.route("/rlt")
		// 	.all(app.config.admin.passaporte.autenticar())
		.get(app.api.relatorios.proprios.home.obter);

	//========================
	// ROTAS USUARIOS ========
	//========================
	app.route("/usuarios")
		// HABILITAR QUANDO TIVER MAIS GENTE USANDO
		// .all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.usuario.incluir)
		.get(app.api.entidades.usuario.obter);

	app.route("/usuario/:id").put(app.api.entidades.usuario.atualizar);

	app.route("/usuarios/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.usuario.obterPorId)
		.delete(admin(app.api.entidades.usuario.remover));

	//========================
	// ROTAS PRODUTOS ========
	//========================
	app.route("/produto").post(app.api.entidades.produto.obterPorParametro);

	app.route("/produtos")
		.post(app.api.entidades.produto.incluir)
		.get(app.api.entidades.produto.obterJoin);

	app.route("/produtos/:id")
		.put(app.api.entidades.produto.atualizar)
		.delete(app.api.entidades.produto.remover);

	//========================
	// ROTAS ESPECIES ========
	//========================
	app.route("/especie").post(app.api.entidades.especie.obterPorParametro);

	app.route("/especies")
		.post(app.api.entidades.especie.incluir)
		.get(app.api.entidades.especie.obter);

	app.route("/especies/:id")
		.get(app.api.entidades.especie.obterPorParametro)
		.put(app.api.entidades.especie.atualizar)
		.delete(app.api.entidades.especie.remover);

	//========================
	// ROTAS CLASSES =========
	//========================
	app.route("/classes")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.classe.incluir)
		.get(app.api.entidades.classe.obter);

	app.route("/classes/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.classe.obterPorId)
		.delete(app.api.entidades.classe.remover)
		.put(app.api.entidades.classe.atualizar);

	//========================
	// ROTAS UNIDADES ========
	//========================
	app.route("/unidade").post(app.api.entidades.unidade.obterPorParametro);

	app.route("/unidades")
		.post(app.api.entidades.unidade.incluir)
		.get(app.api.entidades.unidade.obter);

	app.route("/unidades/:id")
		.put(app.api.entidades.unidade.atualizar)
		.get(app.api.entidades.unidade.obterPorId)
		.delete(app.api.entidades.unidade.remover);

	//========================
	// ROTAS MÓDULOS =========
	//========================
	app.route("/modulos")
		.post(app.api.entidades.telas.modulo.incluir)
		.get(app.api.entidades.telas.modulo.obter);

	app.route("/moduloAnterior/:id").get(
		app.api.entidades.telas.modulo.obterModuloAnterior
	);

	app.route("/arvore/modulos")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.telas.modulo.obterArvore);

	app.route("/recuperarModulos/:id")
		.all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.telas.modulo.recuperarRemovido);

	app.route("/modulos/:id")
		.all(app.config.admin.passaporte.autenticar())
		.get(app.api.entidades.telas.modulo.obterPorId)
		.delete(app.api.entidades.telas.modulo.remover)
		.put(app.api.entidades.telas.modulo.atualizar);

	// ======================= FUTURAMENTE VAI SAIR, SEM USO PARA TELAS
	// ROTAS TELAS ===========
	//========================
	app.route("/telas")
		// .all(app.config.admin.passaporte.autenticar())
		.post(app.api.entidades.telas.tela.incluir)
		.get(app.api.entidades.telas.tela.obterJoin);

	app.route("/telas/:id")
		.all(app.config.admin.passaporte.autenticar())
		.put(app.api.entidades.telas.tela.atualizar);
};
