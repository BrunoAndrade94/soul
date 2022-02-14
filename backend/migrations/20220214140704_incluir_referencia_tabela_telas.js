exports.up = function (knex, Promise) {
	return knex.schema.alterTable("telas", (tabela) => {
		tabela
			.integer("idModulo")
			.references("id")
			.inTable("modulos")
			.notNull();
	});
};

exports.down = function (knex, Promise) {
	return knex.schema.alterTable("telas", (tabela) => {
		tabela.dropColumn("idMoludo");
	});
};
