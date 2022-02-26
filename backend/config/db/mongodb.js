// IP DANTE
// const ip = "192.168.252.47";

// IP CASA
const ip = "10.10.0.254";

const mongoose = require("mongoose");

mongoose
	// .connect(`mongodb://192.168.252.47:3033/estatisticas`, {
	// .connect(`mongodb://${ip}:3033/estatisticas`, {
	.connect("mongodb://localhost/relatorio_home", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((e) => {
		console.log("NÃO FOI POSSIVEL SE CONECTAR SEU MONGODB");
	});
