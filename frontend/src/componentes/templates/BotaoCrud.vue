<template>
	<div class="botao-crud">
		<button variant="success" @click="acao">
			<i class="fa-solid fa-magnifying-glass" /> {{ titulo }}
		</button>
		<!-- <button variant="primary" @click="acao">
			<i class="fa-solid fa-eraser" />Limpar
		</button>
		<button variant="warning" @click="acao">Atualizar</button>
		<button variant="danger" @click="acao">
			<i class="fa-solid fa-trash" />Excluir
		</button> -->
	</div>
</template>

<script>
	export default {
		nome: "BotaoCrud",
		props: {
			acao: String,
			titulo: String,
		},
	};
</script>

<style>
</style>