exports.up = function (knex, Promise) {
	return knex.schema.createTable("unidades", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.integer("fator").defaultTo(1);
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("unidades");
};
