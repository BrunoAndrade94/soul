const porta = 3033;
const ip = "192.168.252.47";
const app = require("express")();
const consign = require("consign");
const bancoDeDados = require("./config/db/bancoDeDados");

// fazer solicitações ao servidor
const mongoose = require("mongoose");

app.db = bancoDeDados;
app.mongoose = mongoose;

consign()
	.include("./config/admin/passaporte.js")
	.then("./config/middlewares.js")
	.then("./api/entidades/db")
	.then("./api")
	.then("./config")
	.into(app);

app.listen(porta, ip, () => {
	console.log("--- BACK ESTÁ DE PÉ --- PORTA: " + porta);
});
