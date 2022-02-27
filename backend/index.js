// IP DANTE
// const ip = "192.168.252.47";

// IP CASA
const ip = "10.10.0.254";

const porta = 3033;
const app = require("express")();
const consign = require("consign");
const bancoDeDados = require("./config/db/bancoDeDados");

// fazer solicitações ao servidor
const mongoose = require("mongoose");
require("./config/db/mongodb");

app.db = bancoDeDados;
app.mongoose = mongoose;

consign()
	.include("./config/admin/passaporte.js")
	.then("./config/middlewares.js")
	.then("./api/relatorios/config/paginacao.js")
	.then("./api/entidades/db")
	.then("./api")
	.then("./config")
	.into(app);

app.listen(porta, ip, () => {
	console.log(`--PORTA: ${porta}\n--IP: ${ip}`);
});
