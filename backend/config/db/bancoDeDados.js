const config = require("../../knexfile.js");
const knex = require("knex")(config);

// RODAR TODAS MIGRATION
// knex.migrate.latest([config])

module.exports = knex;
