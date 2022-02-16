// module.exports = (app) => {
// 	const Estatistica = app.mongoose.model("Estatistica", {
// 		usuarios: Number,
// 		produtos: Number,
// 		modulos: Number,
// 		criadoEm: Date,
// 	});

// 	const obter = (req, res) => {
// 		Estatistica.findOne({}, {}, { sort: { criadoEm: -1 } }).then(
// 			(estatistica) => res.json(estatistica)
// 		);
// 	};

// 	return { Estatistica, obter };
// };
