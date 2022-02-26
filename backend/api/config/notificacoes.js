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
	const especiePossuiProduto = "Espécie possui produto!";

	const unidadeNaoEncontrada = "Unidade não encontrada!";
	const unidadeJaCadastrada = "Unidade já cadastrada!";
	const unidadeNaoInformada = "Unidade não informada!";
	const unidadePossuiProduto = "Unidade possui produto!";

	const emailNaoInformado = "E-mail não informado!";
	const emailJaCadastrado = "E-mail já cadastrado!";

	const moduloAlterado = "Módulo alterado com sucesso!";
	const moduloNaoEncontrado = "Módulo não encontrado!";
	const moduloNaoPossuiCaminho = "Módulo não possui caminho!";
	const moduloPossuiTelas = "Módulo possui telas vinculadas!";
	const moduloPossuiSubModulos = "Módulo possui módulos vinculados!";

	const nomeNaoInformado = "Nome não informado!";
	const senhaNaoInformada = "Senha não informada!";
	const senhasNaoConferem = "Senhas não conferem!";
	const confirmacaoInvalida = "Confirmação de senha inválida!";

	const informeAlgoParaConsulta = "Informe algo para consulta!";
	const digiteAlgo = "Para consultar precisa digitar algo né!";

	const naoEncontreiNada = "Não encontrei nada!";
	const encontreiEssas = "Encontrei essa(s)!";

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
		especiePossuiProduto,
		moduloNaoPossuiCaminho,
		informeAlgoParaConsulta,
		naoEncontreiNada,
		encontreiEssas,
		digiteAlgo,
	};
};
