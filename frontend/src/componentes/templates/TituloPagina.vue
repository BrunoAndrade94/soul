<template>
	<div class="titulo-pagina">
		<h1><i v-if="icone" :class="icone" class="icone" />{{ titulo }}</h1>
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
	.titulo-pagina .icone {
		color: #454545;
		font-size: 3rem;
		margin-right: 15px;
	}
	.titulo-pagina i {
		font-size: 1.8rem;
		padding: 5px;
	}
	.titulo-pagina h2 {
		color: rgb(47, 83, 201);
		margin-top: 5px;
		margin-left: 8px;
		font-size: 1.2rem;
	}
</style>