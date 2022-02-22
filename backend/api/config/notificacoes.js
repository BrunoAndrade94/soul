module.exports = (app) => {
	const atencao = "**** ATENÇÃO **** ";

	// notificações de ID
	const idInvalido = "Informe um ID válido!";

	// notificações de cadastro usuários
	const usuarioNaoEncontrado = "Usuário não encontrado!";
	const usuarioJaCadastrado = "Usuário já cadastrado!";
	const usuarioNaoInformado = "Usuário não informado!";

	const classeNaoEncontrada = "Classe não encontrada!";
	const classeJaCadastrada = "Classe já cadastrada!";
	const classeNaoInformada = "Classe não informada!";
	const classePossuiProduto = "Classe possui produto!";

	const especieJaCadastrada = "Espécie já cadastrada!";
	const especieNaoEncontrada = "Espécie não encontrada!";
	const especieNaoInformada = "Espécie não informada!";

	const unidadeNaoEncontrada = "Unidade não encontrada!";
	const unidadeJaCadastrada = "Unidade já cadastrada!";
	const unidadeNaoInformada = "Unidade não informada!";
	const unidadePossuiProduto = "Unidade possui produto!";

	const emailNaoInformado = "E-mail não informado!";
	const emailJaCadastrado = "E-mail já cadastrado!";

	const moduloAlterado = "Módulo alterado com sucesso!";
	const moduloNaoEncontrado = "Módulo não encontrado!";
	const moduloPossuiTelas = "Módulo possuí telas vinculadas!";
	const moduloPossuiSubModulos = "Módulo possuí módulos vinculados!";

	const nomeNaoInformado = "Nome não informado!";
	const senhaNaoInformada = "Senha não informada!";
	const senhasNaoConferem = "Senhas não conferem!";
	const confirmacaoInvalida = "Confirmação de senha inválida!";
	// -----

	return {
		atencao,
		idInvalido,
		usuarioNaoEncontrado,
		usuarioJaCadastrado,
		usuarioNaoInformado,
		nomeNaoInformado,
		emailNaoInformado,
		emailJaCadastrado,
		senhaNaoInformada,
		senhasNaoConferem,
		confirmacaoInvalida,
		classeNaoEncontrada,
		classeNaoInformada,
		classeJaCadastrada,
		classePossuiProduto,
		unidadeNaoEncontrada,
		unidadeJaCadastrada,
		unidadeNaoInformada,
		unidadePossuiProduto,
		moduloNaoEncontrado,
		moduloPossuiTelas,
		moduloPossuiSubModulos,
		moduloAlterado,
		especieJaCadastrada,
		especieNaoEncontrada,
		especieNaoInformada,
	};
};
