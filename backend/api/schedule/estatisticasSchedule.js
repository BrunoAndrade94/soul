// const schedule = require('node-schedule');

// module.exports = (app) => {
// 	schedule.scheduleJob('*/1 * * * *', async () => {
// 		const totalUsuarios = await app.db('usuarios').count('id').first();
// 		const totalProdutos = await app.db('produtos').count('id').first();
// 		const totalFornecedores = await app
// 			.db('fornecedores')
// 			.count('id')
// 			.first();

// 		const { Estatistica } = app.api.relatorios.proprios.estatistica;

// 		const ultimaEstatistica = await Estatistica.findOne(
// 			{},
// 			{},
// 			{ sort: { criadoEm: -1 } }
// 		);

// 		const estatistica = new Estatistica({
// 			usuarios: totalUsuarios.count,
// 			produtos: totalProdutos.count,
// 			fornecedores: totalFornecedores.count,
// 			criadoEm: new Date(),
// 		});

// 		const mudouUsuarios =
// 			!ultimaEstatistica ||
// 			estatistica.usuarios !== ultimaEstatistica.usuarios;
// 		const mudouProdutos =
// 			!ultimaEstatistica ||
// 			estatistica.produtos !== ultimaEstatistica.produtos;
// 		const mudouFornecedores =
// 			!ultimaEstatistica ||
// 			estatistica.fornecedores !== ultimaEstatistica.fornecedores;

// 		if (mudouUsuarios || mudouProdutos || mudouFornecedores) {
// 			estatistica
// 				.save()
// 				.then(() => console.log('Estatisticas atualizadas!'));
// 		}
// 	});
// };
