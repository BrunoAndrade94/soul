const tableResolver = require("knex/lib/migrate/table-resolver");

exports.up = function (knex, Promise) {
	return knex.schema.createTable("usuarios", (tabela) => {
		tabela.increments("id").primary();
		tabela.string("nome").notNull();
		tabela.string("usuario").notNull();
		tabela.string("email").notNull();
		tabela.string("senha").notNull();
		tabela.boolean("admin").defaultTo(false).notNull();
		tabela.timestamp("removidoEm");
		tabela.timestamp("alteradoEm");
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.dropTable("usuarios");
};
