module.exports = (app) => {
	const relatorio = app.mongoose.model(`relatorio`, {
		usuarios: Number,
		modulos: Number,
		produtos: Number,
		especies: Number,
		unidades: Number,
		criadoEm: Date,
	});

	const obter = (req, res) => {
		relatorio
			.findOne({}, {}, { sort: { criadoEm: -1 } })
			.then((resultado) => {
				const resultadoPadrao = {
					usuarios: 0,
					modulos: 0,
					produtos: 0,
					especies: 0,
					unidades: 0,
				};
				res.json(resultado || resultadoPadrao);
			});
	};

	return { relatorio, obter };
};
