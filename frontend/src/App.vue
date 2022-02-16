<template>
	<div id="app" :class="{ 'esconder-menu': menuVisivel }">
		<Cabecalho
			titulo="MV Souluções"
			:esconderToggle="false"
			:esconderMenuUsuario="false"
		/>
		<Menu />
		<Conteudo />
		<Rodape />
	</div>
</template>

<script>
	import { mapState } from "vuex";
	import Cabecalho from "./componentes/templates/Cabecalho.vue";
	import Menu from "./componentes/templates/menu/Menu";
	import Conteudo from "./componentes/templates/Conteudo.vue";
	import Rodape from "./componentes/templates/Rodape.vue";

	export default {
		name: "App",
		components: {
			Cabecalho,
			Menu,
			Conteudo,
			Rodape,
		},
		computed: mapState(["menuVisivel"]),
	};
</script>

<style>
	* {
		font-family: "Lato", sans-serif;
	}
	body {
		margin: 0;
	}

	#app {
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;

		height: 100vh;
		display: grid;
		grid-template-rows: 60px 1fr 40px;
		grid-template-columns: 300px 1fr;
		grid-template-areas:
			"header header"
			"menu content"
			"menu footer";
	}

	#app.esconder-menu {
		grid-template-areas:
			"header header"
			"content content"
			"footer footer";
	}
</style>