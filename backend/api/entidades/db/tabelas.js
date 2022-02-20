// módulo criado para referênciar as tabelas do banco de dados

module.exports = () => {
	// tabelas
	const usuarios = "usuarios";
	const produtos = "produtos";
	const unidades = "unidades";
	const especies = "especies";
	const classes = "classes";
	const modulos = "modulos";
	const telas = "telas";

	return { usuarios, produtos, especies, unidades, classes, modulos, telas };
};
