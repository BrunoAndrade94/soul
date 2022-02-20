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
		/* background-color: #d1cccc; */
		background-color: #5f5555;
		padding: 20px;
	}
</style>