exports.up = function (knex, Promise) {
	return knex.schema.createTable("produtos", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela
			.integer("idUnidade")
			.references("id")
			.inTable("unidades")
			.notNull();
		tabela
			.integer("idEspecie")
			.references("id")
			.inTable("especies")
			.notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("produtos");
};
