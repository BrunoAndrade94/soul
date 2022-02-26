<template>
	<div class="BotaoCrud">
		<b-button-group class="botao-crud">
			<b-button
				v-b-tooltip.hover
				title="Consultar"
				class="obter"
				:disabled="desativarModoIncluir"
				@click="clicarObter"
				variant="primary"
			>
				<i class="fa-solid fa-magnifying-glass" />
			</b-button>
			<b-button
				v-b-tooltip.hover
				title="Limpar"
				class="limpar"
				:disabled="desativarModoIncluir"
				@click="clicarLimpar"
				variant="info"
			>
				<i class="fa-solid fa-broom" />
			</b-button>
			<b-button
				v-b-tooltip.hover
				title="Incluir"
				class="incluir"
				:disabled="desativarModoIncluir"
				@click="clicarIncluir"
				variant="success"
			>
				<i class="fa-solid fa-download" />
			</b-button>
			<b-button
				v-b-tooltip.hover
				title="Atualizar"
				class="atualizar"
				:disabled="desativarModoOpcoes"
				@click="clicarAtualizar"
				variant="warning"
			>
				<i class="fa-solid fa-highlighter" />
			</b-button>
			<b-button
				v-b-tooltip.hover
				title="Remover"
				class="remover"
				:disabled="desativarModoOpcoes || apenasAtualizar"
				@click="clicarRemover"
				variant="danger"
			>
				<i class="fa-solid fa-trash-can" />
			</b-button>
		</b-button-group>
		<hr />
	</div>
</template>

<script>
	export default {
		nome: "BotaoCrud",
		props: {
			desativarModoIncluir: String,
			desativarModoOpcoes: String,
			clicarObter: String,
			clicarLimpar: String,
			clicarIncluir: String,
			clicarAtualizar: String,
			clicarRemover: String,
			apenasAtualizar: Boolean,
		},
	};
</script>

<style>
	.obter,
	.remover {
		border-radius: 100px;
	}
</style>