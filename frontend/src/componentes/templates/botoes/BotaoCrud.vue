<template>
	<div class="BotaoCrud">
		<b-button-group class="botao-crud">
			<b-button
				class="obter"
				:disabled="desativarModoIncluir"
				@click="clicarObter"
				variant="success"
			>
				<i class="fa-solid fa-magnifying-glass" />
			</b-button>
			<b-button
				class="incluir"
				:disabled="desativarModoIncluir"
				@click="clicarIncluir"
				variant="primary"
			>
				<i class="fa-solid fa-download" />
			</b-button>
			<b-button
				class="atualizar"
				:disabled="desativarModoOpcoes"
				@click="clicarAtualizar"
				variant="warning"
			>
				<i class="fa-solid fa-highlighter" />
			</b-button>
			<b-button
				class="remover"
				:disabled="desativarModoOpcoes"
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
			clicarIncluir: String,
			clicarAtualizar: String,
			clicarRemover: String,
		},
	};
</script>

<style>
	.obter,
	.remover {
		border-radius: 100px;
	}
</style>