// módulo criado para referênciar as colunas das tabelas do banco de dados

module.exports = () => {
	// colunas padrões nas tabelas
	const id = "id";
	const nome = "nome";
	const removidoEm = "removidoEm";
	const alteradoEm = "alteradoEm";

	// colunas tabela usuários
	const usuario = "usuario";
	const email = "email";
	const senha = "senha";
	const admin = "admin";

	// colunas tabela produtos
	const idModulo = "idModulo";
	const idUnidade = "idUnidade";
	const idEspecie = "idEspecie";
	const idClasse = "idClasse";
	const idTela = "idTela";
	const maeId = "maeId";

	return {
		id,
		nome,
		removidoEm,
		alteradoEm,
		usuario,
		email,
		senha,
		admin,
		maeId,
		idUnidade,
		idEspecie,
		idTela,
	};
};
