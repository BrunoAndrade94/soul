// const schedule = require("node-schedule");

// module.exports = (app) => {
// 	schedule.scheduleJob("*/1 * * * *", async () => {
// 		const totalUsuarios = await app.db("usuarios").count("id").first();
// 		const totalProdutos = await app.db("produtos").count("id").first();
// 		const totalmodulos = await app.db("modulos").count("id").first();

// 		const { Estatistica } = app.api.relatorios.proprios.estatisticas;

// 		const ultimaEstatistica = await Estatistica.findOne(
// 			{},
// 			{},
// 			{ sort: { criadoEm: -1 } }
// 		);

// 		const estatistica = new Estatistica({
// 			usuarios: totalUsuarios.count,
// 			produtos: totalProdutos.count,
// 			modulos: totalmodulos.count,
// 			criadoEm: new Date(),
// 		});

// 		const mudouUsuarios =
// 			!ultimaEstatistica ||
// 			estatistica.usuarios !== ultimaEstatistica.usuarios;
// 		const mudouProdutos =
// 			!ultimaEstatistica ||
// 			estatistica.produtos !== ultimaEstatistica.produtos;
// 		const mudouModulos =
// 			!ultimaEstatistica ||
// 			estatistica.modulos !== ultimaEstatistica.modulos;

// 		if (mudouUsuarios || mudouProdutos || mudouModulos) {
// 			estatistica
// 				.save()
// 				.then(() => console.log("Estatisticas atualizadas!"));
// 		}
// 	});
// };
