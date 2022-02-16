<template>
	<div class="conteudo">
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		nome: "Conteudo",
	};
</script>

<style>
	.conteudo {
		grid-area: content;
		background-color: #504b4b;
		padding: 20px;
	}
</style>