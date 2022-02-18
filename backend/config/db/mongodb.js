const mongoose = require("mongoose");

mongoose
	.connect(`mongodb://192.168.252.47:3033/estatisticas`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((e) => {
		console.log("NÃO FOI POSSIVEL SE CONECTAR SEU MONGODB");
	});
