const schedule = require("node-schedule");

module.exports = (app) => {
	const tempoParaExecucao = "*/1 * * * *";
	const tabela = app.api.entidades.db.tabelas;
	const coluna = app.api.entidades.db.colunas;

	schedule.scheduleJob(tempoParaExecucao, async () => {
		const totalDeUsuarios = await app
			.db(tabela.usuarios)
			.count(coluna.id)
			//.whereNull(coluna.removidoEm)
			.first();
		const totalDeModulos = await app
			.db(tabela.modulos)
			.count(coluna.id)
			//.whereNull(coluna.removidoEm)
			.first();
		const totalDeProdutos = await app
			.db(tabela.produtos)
			.count(coluna.id)
			//.whereNull(coluna.removidoEm)
			.first();
		const totalDeEspecies = await app
			.db(tabela.especies)
			.count(coluna.id)
			//.whereNull(coluna.removidoEm)
			.first();
		const totalDeUnidades = await app
			.db(tabela.unidades)
			.count(coluna.id)
			//.whereNull(coluna.removidoEm)
			.first();

		const { relatorio } = app.api.relatorios.proprios.home;

		const ultimoRelatorio = await relatorio.findOne(
			{},
			{},
			{ sort: { criadoEm: -1 } }
		);

		const novoRelatorio = new relatorio({
			usuarios: totalDeUsuarios.count,
			modulos: totalDeModulos.count,
			produtos: totalDeProdutos.count,
			especies: totalDeEspecies.count,
			unidades: totalDeUnidades.count,
			criadoEm: new Date(),
		});

		const mudouUsuarios =
			!ultimoRelatorio ||
			novoRelatorio.usuarios !== ultimoRelatorio.usuarios;
		const mudouModulos =
			!ultimoRelatorio ||
			novoRelatorio.modulos !== ultimoRelatorio.modulos;
		const mudouProdutos =
			!ultimoRelatorio ||
			novoRelatorio.produtos !== ultimoRelatorio.produtos;
		const mudouEspecies =
			!ultimoRelatorio ||
			novoRelatorio.especies !== ultimoRelatorio.especies;
		const mudouUnidades =
			!ultimoRelatorio ||
			novoRelatorio.unidades !== ultimoRelatorio.unidades;

		if (
			mudouUsuarios ||
			mudouModulos ||
			mudouProdutos ||
			mudouEspecies ||
			mudouUnidades
		) {
			novoRelatorio
				.save()
				.then(() => console.log("[Home] - Relatório Atualizado!"));
		}
	});
};
