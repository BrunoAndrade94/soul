<template>
	<div class="telas">
		<TituloPagina
			icone="fa-solid fa-desktop"
			titulo="Telas"
			sub="Aqui pode gerenciar as informações das telas"
		/>
		<BotaoCrud
			:desativarModoIncluir="modo === 'opcoes'"
			:desativarModoOpcoes="modo === 'incluir'"
			:clicarObter="obter"
			:clicarIncluir="incluir"
			:clicarAtualizar="atualizar"
			:clicarRemover="remover"
		/>
	</div>
</template>

<script>
	// import axios from "axios";
	import BotaoCrud from "../botoes/BotaoCrud.vue";
	import IdDescricao from "../entradaSaida/IdDescricao.vue";
	import TituloPagina from "../TituloPagina.vue";
	export default {
		nome: "Telas",
		components: { TituloPagina, BotaoCrud, IdDescricao },
		data: function () {
			return {
				modo: "incluir",
				tela: {},
				telas: [],
				campos: [
					{
						key: "id",
						label: "#",
					},
					{ key: "nome", label: "Descrição", sortable: true },
					{
						key: "acoes",
						label: "Opcões",
					},
				],
			};
		},
	};
</script>

<style>
</style>