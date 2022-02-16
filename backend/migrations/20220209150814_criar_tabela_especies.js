exports.up = function (knex, Promise) {
	return knex.schema.createTable("especies", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("especies");
};
