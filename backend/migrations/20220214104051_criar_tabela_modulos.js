exports.up = function (knex, Promise) {
	return knex.schema.createTable("modulos", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.binary("descricao", 1000);
		tabela.integer("maeId").references("id").inTable("modulos");
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("modulos");
};
