exports.up = function (knex, Promise) {
	return knex.schema.createTable("telas", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela
			.integer("idModulo")
			.references("id")
			.inTable("modulos")
			.notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("telas");
};
