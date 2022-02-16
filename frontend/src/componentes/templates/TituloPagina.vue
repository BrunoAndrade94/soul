<template>
	<div class="titulo-pagina">
		<h1><i v-if="icone" :class="icone" />{{ titulo }}</h1>
		<h2>{{ sub }}</h2>
		<hr />
	</div>
</template>

<script>
	export default {
		nome: "TituloPagina",
		props: ["icone", "titulo", "sub"],
	};
</script>

<style>
	.titulo-pagina h1 {
		margin: 0px;
		padding: 5px;
	}
	.titulo-pagina h2 {
		color: rgb(235, 217, 217);
		margin-top: 5px;
		font-size: 1.3rem;
	}
</style>