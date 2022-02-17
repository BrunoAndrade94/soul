const porta = 3033;
const ip = "192.168.250.47";
const app = require("express")();
const consign = require("consign");
const bancoDeDados = require("./config/db/bancoDeDados");

// fazer solicitações ao servidor
// const mongoose = require("mongoose");

app.db = bancoDeDados;
// app.mongoose = mongoose;

consign()
	.then("./config/middlewares.js")
	.then("./api/entidades/db")
	.then("./api")
	.then("./config")
	.into(app);

app.listen(porta, "0.0.0.0", () => {
	console.log("--- BACK ESTÁ DE PÉ --- PORTA: " + porta);
});
